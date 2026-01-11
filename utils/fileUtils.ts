import fs from 'fs';
import path from 'path';

/**
 * Utility class for handling file operations
 */
export class FileUtils {
    /**
     * Reads a file from the data folder and returns a Buffer
     * @param fileName Name of the file in the /data directory
     */
    static getFileBuffer(fileName: string): Buffer {
        const filePath = path.resolve(__dirname, '../data', fileName);
        
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}. Please ensure the test data exists.`);
        }
        
        return fs.readFileSync(filePath);
    }
}