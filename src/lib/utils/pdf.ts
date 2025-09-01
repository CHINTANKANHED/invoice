import pdfMake from 'pdfmake/build/pdfmake';
export async function generateInvoicePDF(invoiceData: any) {
  // const pdfmake = require('pdfmake');
  // const pdfMakeModule = await import('pdfmake/build/pdfmake');
  // // const pdfFonts = await import('pdfmake/build/vfs_fonts');
  // const pdfMake = (pdfMakeModule && (pdfMakeModule.default || pdfMakeModule));
  // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.fonts = {
	Roboto: {
		normal: `${window.location.origin}/fonts/Roboto-Medium.ttf`,
		bold: `${window.location.origin}/fonts/Roboto-Medium.ttf`,
		italics: `${window.location.origin}/fonts/Roboto-Medium.ttf`,
		bolditalics: `${window.location.origin}/fonts/Roboto-Medium.ttf`
	}
};


  function fmt(value: number, currency: string) {
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value);
    } catch (e) {
      return value.toFixed(2) + ' ' + currency;
    }
  }

  const body = [
    [{ text: 'Item', style: 'tableHeader' }, { text: 'Qty', style: 'tableHeader' }, { text: 'Rate', style: 'tableHeader' }, { text: 'Amount', style: 'tableHeader' }],
    ...invoiceData.items.map((it: any) => [
      it.description || '',
      String(it.qty || 0),
      fmt(it.rate || 0, invoiceData.currency || 'USD'),
      fmt((it.qty||0)*(it.rate||0), invoiceData.currency || 'USD')
    ]),
    [{ text: 'Subtotal', colSpan: 3, alignment: 'right' }, {}, {}, fmt(invoiceData.subtotal || 0, invoiceData.currency || 'USD')],
    [{ text: 'Tax', colSpan: 3, alignment: 'right' }, {}, {}, fmt(invoiceData.taxAmount || 0, invoiceData.currency || 'USD')],
    [{ text: 'Total', colSpan: 3, alignment: 'right', bold: true }, {}, {}, fmt(invoiceData.total || 0, invoiceData.currency || 'USD')]
  ];

  const docDefinition: any = {
    content: [
      { text: 'INVOICE', style: 'header' },
      { text: invoiceData.billedBy?.name || '', margin: [0, 4, 0, 0] },
      { text: invoiceData.billedBy?.address || '', margin: [0, 0, 0, 6] },
      { table: { widths: ['*','auto','auto','auto'], body } },
      { text: '\nNotes:\n' + (invoiceData.notes || ''), margin: [0,10,0,0] }
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      tableHeader: { bold: true, fillColor: '#eeeeff' }
    }
  };

  pdfMake.createPdf(docDefinition).download(`invoice-${invoiceData.number || '1'}.pdf`);
}
