import { useEffect, useState } from "react";
import { open } from '@tauri-apps/api/dialog';
import { readBinaryFile } from '@tauri-apps/api/fs';
import * as xlsx from 'xlsx';
import "./App.css";
import Table from './components/Table'
import FabNew from './components/Fab'

function App() {
    const [sheet, setSheet] = useState<any[]>([]);

    const openFile = async () => {
        const selected = await open({
            title: "Open Spreadsheet",
            multiple: false,
            directory: false
        });

        const d = await readBinaryFile(selected as string);
        const wb = xlsx.read(d);
        const sheet = xlsx.utils.sheet_to_json<any[]>(wb.Sheets.Sheet1);

        sheet.forEach((o: any, ind) => {
            o["id"] = ind;
        })
        setSheet(sheet);
        console.log(sheet);
    }

    return (
        <div>
            {sheet.length != 0 && <Table data={sheet} />}
            <FabNew add={openFile} />
        </div>
    );
}

export default App;
