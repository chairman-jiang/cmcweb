import jsPDF from 'jspdf';

const options = {
  orientation: 'p', // 取向 "p" or "l"
  unit: 'pt', // 单位 "pt", "mm", "cm", "m", "in" or "px"
  format: 'a4', // 格式 a0 - a10, b0 - b10, c0 - c10, dl, letter, government-letter, legal, junior-legal, ledger, tabloid, credit-card
  floatPrecision: '16' // 浮动精度
};

export const exportPDF = (canvasList: HTMLCanvasElement[], fileName: string = '报表') => {

  let pdf = new jsPDF('l', 'pt', 'a4');
  canvasList.forEach((canvas, index) => {
    let A4Height = 595.28;
    let A4Width = 841.89;
    let contentWidth = canvas.width;
    let contentHeight = canvas.height;

    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    // a4真实宽度 / canvas宽度 求出比例, 再乘 canvas的高度算出真实高度
    /** 比如
     * canvasWidth: 3254
     * canvasHeight: 1340
     * 841.89 / 3254 * 1340 = 346.69102642901044
     * imageWidth: 841.89
     * imageHeight: 346
    */

    let imgWidth = A4Width;
    let imgHeight = A4Width / contentWidth * contentHeight;
    let mutableHeight = imgHeight;
    let positoin = 0;

    let pageData = canvas.toDataURL('image/jpeg', 1.0);
    
    // 如果图片高度大于a4纸高度
    if (imgHeight > A4Height) {

      // 每次判断 可变高度 截取之后是否大于0
      while (mutableHeight > 0) {
        // 根据position位置显示图片
        pdf.addImage(pageData, 'JPEG', 0, positoin, imgWidth, imgHeight );

        mutableHeight -= A4Height;
        positoin -= A4Height
        
        if (mutableHeight > 0) {
          pdf.addPage();
        }
      }

    } else {
      // 直接添加就好
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
    }
    
    if (index !== canvasList.length - 1) {
      pdf.addPage()
    }

  })
  pdf.save(`${fileName}.pdf`);
}
