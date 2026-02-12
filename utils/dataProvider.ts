import fs from 'fs';
import {parse} from 'csv-parse/sync';
import { json } from 'stream/consumers';

export class DataProvider
{
    static getTestDataFromJson(filepath_json:string):any    {
       const jsonData:any=JSON.parse(fs.readFileSync(filepath_json,'utf-8'));
       return jsonData;
    }



    static getTestDataFromCSV(filepath_csv:string):any
    {
        const csvData_:any=fs.readFileSync(filepath_csv,'utf-8');
        const csvData:any=parse(csvData_,{columns:true,skip_empty_lines:true});
        return csvData;
    }
}