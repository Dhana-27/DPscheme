import { google } from 'googleapis';
import { parse } from 'csv-parse/sync';
import { insertScheme, insertLoan } from './database';
import { v4 as uuidv4 } from 'uuid';

// Ensure these are set in your .env.local
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN; // Pre-obtained refresh token

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

if (GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });
}

const drive = google.drive({ version: 'v3', auth: oauth2Client });

export async function getGoogleDriveFileContent(fileId: string): Promise<string | null> {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    }, {
      responseType: 'stream',
    });

    return new Promise((resolve, reject) => {
      let data = '';
      response.data
        .on('data', chunk => (data += chunk))
        .on('end', () => resolve(data))
        .on('error', err => reject(err));
    });
  } catch (error) {
    console.error('Error fetching Google Drive file content:', error);
    return null;
  }
}

export async function processCsvData(csvContent: string, type: 'schemes' | 'loans') {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const record of records) {
      if (type === 'schemes') {
        const scheme = {
          name: record.name || 'Untitled Scheme',
          description: record.description || '',
          provider: record.provider || 'Unknown',
          provider_type: record.provider_type || 'central_govt', // Default
          amount: record.amount || 'N/A',
          category: record.category || 'General',
          state: record.state || 'All India',
          district: record.district || null,
          eligibility: record.eligibility || 'N/A',
          application_process: record.application_process || 'See website',
          documents_required: record.documents_required || 'N/A',
          contact_info: record.contact_info || 'N/A',
          website_url: record.website_url || null,
          deadline: record.deadline || null,
        };
        const result = await insertScheme(scheme);
        if (result.success) {
          successCount++;
        } else {
          errorCount++;
          errors.push(`Failed to insert scheme "${scheme.name}": ${result.error}`);
        }
      } else if (type === 'loans') {
        const loan = {
          name: record.name || 'Untitled Loan',
          bank_name: record.bank_name || 'Unknown Bank',
          bank_type: record.bank_type || 'public_sector', // Default
          amount: record.amount || 'N/A',
          interest_rate: record.interest_rate || 'N/A',
          category: record.category || 'General',
          description: record.description || '',
          eligibility: record.eligibility || 'N/A',
          documents_required: record.documents_required || 'N/A',
          processing_time: record.processing_time || 'N/A',
          contact_info: record.contact_info || 'N/A',
          website_url: record.website_url || null,
        };
        const result = await insertLoan(loan);
        if (result.success) {
          successCount++;
        } else {
          errorCount++;
          errors.push(`Failed to insert loan "${loan.name}": ${result.error}`);
        }
      }
    }
    return { success: true, successCount, errorCount, errors };
  } catch (error) {
    console.error('Error processing CSV data:', error);
    return { success: false, successCount: 0, errorCount: records.length, errors: [`Failed to parse CSV: ${error instanceof Error ? error.message : String(error)}`] };
  }
}
