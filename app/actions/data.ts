'use server';

import { processCsvData, insertScheme, insertLoan } from '@/lib/google-drive';
import { getGoogleDriveFileContent } from '@/lib/google-drive';
import { revalidatePath } from 'next/cache';

export async function importDataFromGoogleDrive(fileId: string, type: 'schemes' | 'loans') {
  try {
    const csvContent = await getGoogleDriveFileContent(fileId);
    if (!csvContent) {
      return { success: false, message: 'Failed to fetch content from Google Drive.' };
    }

    const result = await processCsvData(csvContent, type);
    if (result.success) {
      revalidatePath('/grants'); // Revalidate paths to show new data
      revalidatePath('/loans');
      revalidatePath('/dashboard');
      return { success: true, message: `Successfully imported ${result.successCount} ${type}. ${result.errorCount} errors.`, errors: result.errors };
    } else {
      return { success: false, message: `Failed to import data: ${result.errors.join(', ')}` };
    }
  } catch (error) {
    console.error('Error in importDataFromGoogleDrive action:', error);
    return { success: false, message: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}` };
  }
}

export async function importDataFromCsvUpload(csvContent: string, type: 'schemes' | 'loans') {
  try {
    const result = await processCsvData(csvContent, type);
    if (result.success) {
      revalidatePath('/grants'); // Revalidate paths to show new data
      revalidatePath('/loans');
      revalidatePath('/dashboard');
      return { success: true, message: `Successfully imported ${result.successCount} ${type}. ${result.errorCount} errors.`, errors: result.errors };
    } else {
      return { success: false, message: `Failed to import data: ${result.errors.join(', ')}` };
    }
  } catch (error) {
    console.error('Error in importDataFromCsvUpload action:', error);
    return { success: false, message: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}` };
  }
}
