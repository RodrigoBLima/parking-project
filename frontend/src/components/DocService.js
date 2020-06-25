import { savePDF } from '@progress/kendo-react-pdf';
// TAMANHOS PARA A IMPORTAÇÃO
// https://www.telerik.com/kendo-angular-ui/components/drawing/api/pdf/PaperSize/ 
class DocService {
    createPdf = (html) => {
        savePDF(html, {
            paperSize: "auto",
            fileName: 'relatório.pdf',
            margin: 4
        })
    }
}

const Doc = new DocService();
export default Doc;