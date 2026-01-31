import { describe, it, expect, vi } from 'vitest';
import { exportToExcel } from './exportUtils';
import * as XLSX from 'xlsx';

vi.mock('xlsx', () => ({
    utils: {
        json_to_sheet: vi.fn(),
        book_new: vi.fn(),
        book_append_sheet: vi.fn(),
    },
    writeFile: vi.fn(),
}));

describe('exportUtils', () => {
    it('should call xlsx functions to export data', () => {
        const data = [{ id: 1, name: 'Test' }];
        const fileName = 'test-report';

        exportToExcel(data, fileName);

        expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith(data);
        expect(XLSX.utils.book_new).toHaveBeenCalled();
        expect(XLSX.utils.book_append_sheet).toHaveBeenCalled();
        expect(XLSX.writeFile).toHaveBeenCalled();
        // expect(XLSX.writeFile).toHaveBeenCalledWith(expect.anything(), expect.stringContaining('test-report'));
    });
});
