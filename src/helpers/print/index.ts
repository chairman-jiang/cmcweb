import { isArrayHasContents } from '@/utils';
import html2canvas from 'html2canvas';

export { default as exportPDF } from './export-pdf';

export default function print(domList: HTMLElement[]) {
  const canvasList: Promise<HTMLCanvasElement>[] = domList.map(element => {
    return html2canvas(element, {
      backgroundColor: '#fff'
    });
  })
  return new Promise((resolve, reject) => {
    getHtml(canvasList).then(dom => {
      writeIframe(dom, resolve);
    }).catch(err => {
      reject(err);
    });
  });
}

async function getHtml(canvasList: Promise<HTMLCanvasElement>[]) {
  const A4Height = 595.28;
  const A4Width = 841.89;

  let pageAll = document.createElement('div');
  pageAll.setAttribute('style', `height:${A4Height}px;width:${A4Width}px;`);

  const addPage = function (pageData: string, height: number, position: number = 0) {
    let page = document.createElement('div')
    page.setAttribute('style', `position: relative; overflow: hidden; height: ${A4Height}px; width: ${A4Width}px; page-break-after: always; background: #F7F8F9;`);
    let img = document.createElement('img');
    img.setAttribute('style', `position: absolute;top: ${position}px;width:${A4Width}px;height:${height}px;`);
    img.src = pageData;
    page.appendChild(img)
    return page;
  };

  const res = await Promise.all(canvasList);

  if (isArrayHasContents(res)) {
    res.forEach(canvas => {
      let contentWidth = canvas.width;
      let contentHeight = canvas.height;
  
      let imgHeight = A4Width / contentWidth * contentHeight;

      let mutableHeight = imgHeight;
      let positoin = 0;

      let pageData = canvas.toDataURL('image/jpeg', 1.0);

      if (imgHeight > A4Height) {
        // 每次判断 可变高度 截取之后是否大于0
        while (mutableHeight > 0) {
          let subPage = addPage(pageData, imgHeight, positoin)
          pageAll.appendChild(subPage)
          mutableHeight -= A4Height;
          positoin -= A4Height
          
          if (mutableHeight > 0) {}
        }

      } else {
        let subPage = addPage(pageData, imgHeight)
        pageAll.appendChild(subPage)
      }
    });
  }
  
  return pageAll.outerHTML;
}

function writeIframe(content: string, resolve: (value: unknown) => void) {
  let w: WindowProxy | Document | null, doc, iframe = document.createElement('iframe');
  iframe.id = "myIframe";
  iframe.setAttribute('style', 'position:absolute;width:auto;height:100%;top:-10px;left:-10px;visibility: hidden;');
  let f = document.body.appendChild(iframe);
  w = f.contentWindow || f.contentDocument;
  doc = f.contentDocument || f.contentWindow?.document;
  doc?.open();
  doc?.write(content); // 注入HTML
  doc?.close();

  iframe.onload = function () {
    resolve(true);
    toPrint(w);
    setTimeout(function () {
      document.body.removeChild(iframe)
    }, 100)
  }
}

function toPrint (frameWindow: any) {
  try {
    setTimeout(function () {
      frameWindow.focus();
      try {
        if (!frameWindow.document.execCommand('print', false, undefined)) {
          frameWindow.print();
        }
      } catch (e) {
        frameWindow.print();
      }
      frameWindow.close();
    }, 10);
  } catch (err) {
    console.log('err', err);
  }
}
