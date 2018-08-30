const pdfjsLib = require('pdfjs-dist');
const interact = require('interactjs');
const toastr = require('toastr');

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

require('pdfjs-dist/build/pdf.worker.entry');

// URL of PDF document
var pdfData = atob(
  'JVBERi0xLjcKJcKzx9gNCjEgMCBvYmoNPDwvTmFtZXMgPDwvRGVzdHMgNCAwIFI+PiAvT3V0bGlu\n' +
  'ZXMgNSAwIFIgL1BhZ2VzIDIgMCBSIC9UeXBlIC9DYXRhbG9nPj4NZW5kb2JqDTMgMCBvYmoNPDwv\n' +
  'QXV0aG9yIChiaWhhbWEpIC9Db21tZW50cyAoKSAvQ29tcGFueSAoKSAvQ3JlYXRpb25EYXRlIChE\n' +
  'OjIwMTgwODMwMDc1OTQ4KzAwJzU5JykgL0NyZWF0b3IgKFdQUyBPZmZpY2UgQ29tbXVuaXR5KSAv\n' +
  'S2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAxODA4MzAwNzU5NDgrMDAnNTknKSAvUHJvZHVjZXIg\n' +
  'KCkgL1NvdXJjZU1vZGlmaWVkIChEOjIwMTgwODMwMDc1OTQ4KzAwJzU5JykgL1N1YmplY3QgKCkg\n' +
  'L1RpdGxlICgpIC9UcmFwcGVkIGZhbHNlPj4NZW5kb2JqDTYgMCBvYmoNPDwvQ29udGVudHMgNyAw\n' +
  'IFIgL01lZGlhQm94IFswIDAgNTk1LjMgODQxLjldIC9QYXJlbnQgMiAwIFIgL1Jlc291cmNlcyA8\n' +
  'PC9Gb250IDw8L0ZUMTMgMTMgMCBSIC9GVDggOCAwIFI+Pj4+IC9UeXBlIC9QYWdlPj4NZW5kb2Jq\n' +
  'DTcgMCBvYmoNPDwvRmlsdGVyIC9GbGF0ZURlY29kZSAvTGVuZ3RoIDI4Nzc+Pg0Kc3RyZWFtDQp4\n' +
  'nNVcW6sktxF+D8x/mOeAldatW4IQyNndEwjkweFAfkBIAgYH7Jf8/egyZ06X+lN1abpnd41Zs5Z7\n' +
  'pFKp6qurpK9T+ucHnf4VnFbx+s+fL79c8piPXtnb4K//uvzj99f/pvH/Xcz1b+nPX9Ofn8p3k5qs\n' +
  'vv79L5eXt9V///qfyx9e38LVuOn69u9LGvR1pfI3HaOawzVYNcXr28+XP06Tnf/09tNVL0YtcUkf\n' +
  'vn3Og6EMRnMf8GUgGGWjfh80rg4uSodw/3JJg7/78lbIoqsbF1Sgq5vXMkX6H6vV8bxTHszbar4i\n' +
  'JL3TSX6K59NdOq3ecskCLpnKpdmSxb4gCtCXmNbPeTDMu3ze3VQSA22vxmggB3bWeYdaT8p87PFT\n' +
  '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\n' +
  'Xp90c7kpREk44/VJyWtmJ70++ePl/yOO09kNCmVuZHN0cmVhbQ1lbmRvYmoNMTMgMCBvYmoNPDwv\n' +
  'QmFzZUZvbnQgL1JEQVRPSCtEZWphVnVTYW5zIC9EZXNjZW5kYW50Rm9udHMgWzE1IDAgUl0gL0Vu\n' +
  'Y29kaW5nIC9JZGVudGl0eS1IIC9TdWJ0eXBlIC9UeXBlMCAvVG9Vbmljb2RlIDE0IDAgUiAvVHlw\n' +
  'ZSAvRm9udD4+DWVuZG9iag0xNCAwIG9iag08PC9GaWx0ZXIgL0ZsYXRlRGVjb2RlIC9MZW5ndGgg\n' +
  'NDc1Pj4NCnN0cmVhbQ0KeJxdlM2K4kAURvc+RS17Fk2SqnurFESwtQUX88PY8wAxKZ3AmIQYF779\n' +
  'lDnSAyMoHJK6X74Trtlmv923zWiyH0NXHeJoTk1bD/Ha3YYqmmM8N+2ssKZuqvFJ0291KftZlg4f\n' +
  '7tcxXvbtqTPLZfYzXbuOw928rOvuGL+Y7PtQx6Fpz+bl1+aQ+HDr+z/xEtvR5KuVqeMpjfla9t/K\n' +
  'SzTZdOp1X6fLzXh/TUf+3fFx76OxExc8StXV8dqXVRzK9hxnyzx9Vma5S5/VLLb1f9d1zrHjqfpd\n' +
  'DtPtu3R7ntvN6kFFDm2hAnqHLLSD3EQuhwQqIIUs5CEHBUigOaTQGgrQGzSHNtAC2kLriSzpQrol\n' +
  'XUi3pAvplnQh3S4gD5En5FnyhDxLnjzz3qE3CIOCQYdBwaDDoGDQYVAw6DCoGHR0UDo4OigdHB2U\n' +
  'Do4OSgeHM8WZ46mVpxZmemYKMz0zhZmemcJMz0zhrXjeimDJY0nI8+QJzjzOhHT/TMeZx5ngzONM\n' +
  'cOZxpjjzOFOceZwpzjzOFGcBZ0qjQCOlUaCR0ijQSGkUaKQ0CjRSGgUaKY0CjZRGYTEt03NrHmuV\n' +
  'dt987mx1G4a0rtMfxLSnjw1t2vj5H9J3vUmnHt+/QVkK8g0KZW5kc3RyZWFtDWVuZG9iag0xOCAw\n' +
  'IG9iag08PC9PcmRlcmluZyAoSWRlbnRpdHkpIC9SZWdpc3RyeSAoQWRvYmUpIC9TdXBwbGVtZW50\n' +
  'IDA+Pg1lbmRvYmoNMTUgMCBvYmoNPDwvQmFzZUZvbnQgL1JEQVRPSCtEZWphVnVTYW5zIC9DSURT\n' +
  'eXN0ZW1JbmZvIDE4IDAgUiAvQ0lEVG9HSURNYXAgL0lkZW50aXR5IC9EVyA2MDAgL0ZvbnREZXNj\n' +
  'cmlwdG9yIDE2IDAgUiAvU3VidHlwZSAvQ0lERm9udFR5cGUyIC9UeXBlIC9Gb250IC9XIFsxNSBb\n' +
  'MzE3IDM2MF0gMTcgWzMxNyAzMzYgNjM2IDYzNiA2MzYgNjM2IDYzNiA2MzZdIDI2IDI4IDYzNiAy\n' +
  'OSBbMzM2XSAzNiBbNjg0IDY4NiA2OTggNzcwXSA0MSBbNTc1XSA0MyBbNzUxIDI5NCAyOTQgNjU1\n' +
  'IDU1NyA4NjIgNzQ4IDc4NyA2MDMgNzg3IDY5NCA2MzQgNjEwXSA1OCBbOTg4XSA2MCBbNjEwXSA2\n' +
  'OCBbNjEyIDYzNCA1NDkgNjM0IDYxNSAzNTIgNjM0IDYzMyAyNzcgMjc3IDU3OSAyNzcgOTc0IDYz\n' +
  'MyA2MTEgNjM0XSA4NSBbNDExIDUyMCAzOTIgNjMzIDU5MSA4MTcgNTkxIDU5MV1dPj4NZW5kb2Jq\n' +
  'DTE2IDAgb2JqDTw8L0FzY2VudCAxMjMyIC9BdmdXaWR0aCA1MDYgL0NhcEhlaWdodCAwIC9EZXNj\n' +
  'ZW50IC00NjIgL0ZsYWdzIDMyIC9Gb250QkJveCBbLTEwMjAgLTQ2MiAxNzkzIDEyMzJdIC9Gb250\n' +
  'RmFtaWx5IChEZWphVnUgU2FucykgL0ZvbnRGaWxlMiAxNyAwIFIgL0ZvbnROYW1lIC9SREFUT0gr\n' +
  'RGVqYVZ1U2FucyAvRm9udFN0cmV0Y2ggL05vcm1hbCAvRm9udFdlaWdodCA0MDAgL0l0YWxpY0Fu\n' +
  'Z2xlIDAgL01heFdpZHRoIDE4NzQgL01pc3NpbmdXaWR0aCA2MDAgL1N0ZW1WIDU2IC9UeXBlIC9G\n' +
  'b250RGVzY3JpcHRvciAvWEhlaWdodCAwPj4NZW5kb2JqDTE3IDAgb2JqDTw8L0ZpbHRlciAvRmxh\n' +
  'dGVEZWNvZGUgL0xlbmd0aCAxOTMwNyAvTGVuZ3RoMSA2Mjk2ND4+DQpzdHJlYW0NCnic7b0JYBVF\n' +
  '1jZ8qqur+25J7g0JEBKyEMIuRMIi+xXZQYyCCCgYICLiAojsYBBkExAQCIoIURYRECMiBkQFQQGB\n' +
  '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\n' +
  'lhf1NFtibmRrzMKo96NORYWiGsnH15rccFJ7T3qudS/bcNzaYe04zl6xHjzO6rK6ek7pqdLdrMjq\n' +
  'onXTKluj2AKly2A7SF0Ww+YGbzBdmjtAMZLNRDHRgRiKiQr4okiS6ChMXF8A07Z9lNftJ6+Yxd+I\n' +
  '9u70R0f5PG7MVleMHuP1hwfApdjujWC71z68pLjuh0IudvZ3rjYbxXdVGkuenzVIuAw3j6rsqRLl\n' +
  'j0qPahrV1XOTp2dUf3d/z3DPrKipUYujYj2ERmCmeaO9MVVYvObX/aKKJ84b56sWXS2mNtXEypuq\n' +
  'p4q6rjruDE9Nb01f7ah60fViUgPNoS2bapl6prjO08zbzHddVIvoFjGZgespyIJakAf1oDMD27s7\n' +
  'ejpHdY3uGhMM9Kab2c3arTxbz8b43Irxuc19G2bhrb5+0f1isgND2VBtmOee6HticgKTXOOjx8fM\n' +
  'ocfcM7wzfHOi5kTPiXnKvdS71Lc8ennMGu8a38bojTGFgfcDpwKhwF0YSxHNbDeoHVN7idrinksm\n' +
  'L76vR++sNKuVrXCH7Z+4vMvM3nrPkiX8Pui+/wcVqCSCDQplbmRzdHJlYW0NZW5kb2JqDTggMCBv\n' +
  'YmoNPDwvQmFzZUZvbnQgL1VDSkhaUCtEZWphVnVTYW5zLUJvbGQgL0Rlc2NlbmRhbnRGb250cyBb\n' +
  'MTAgMCBSXSAvRW5jb2RpbmcgL0lkZW50aXR5LUggL1N1YnR5cGUgL1R5cGUwIC9Ub1VuaWNvZGUg\n' +
  'OSAwIFIgL1R5cGUgL0ZvbnQ+Pg1lbmRvYmoNOSAwIG9iag08PC9GaWx0ZXIgL0ZsYXRlRGVjb2Rl\n' +
  'IC9MZW5ndGggMzI3Pj4NCnN0cmVhbQ0KeJxd0stqhDAUBuC9T3GW08XgLWoLIkznAi56obYP4CTH\n' +
  'qVBjiM7Ct2/MP0yhAYWP5Bz+XMJ9fah1P1P4bkfZ8Exdr5XlabxayXTmS6+DOCHVy/km/5dDa4LQ\n' +
  'FTfLNPNQ626ksgw/3Nw024U2OzWe+YHCN6vY9vpCm69949xcjfnhgfVMUVWR4s61eWnNazswhb5q\n' +
  'Wys33c/L1pX8rfhcDFPiHSOKHBVPppVsW33hoIzcqKg8uVEFrNW/+SRF2bmT361dlyfCLY8iEVde\n' +
  'BSSgRyiDDtAOOkLP0Anae6URdIBi6AilXlkEZVAC5VAKIUuGLCmyZMiS7qDCS2APOfYg0DNHT4Eu\n' +
  'OboIdMnRRSB1jtQuhNcJQs4COTP0LNAze4Jyf8S3s1wP270Iut+kvFrrLtE/G3976731mu8vy4yG\n' +
  'XNX6/QIcE6t2DQplbmRzdHJlYW0NZW5kb2JqDTEwIDAgb2JqDTw8L0Jhc2VGb250IC9VQ0pIWlAr\n' +
  'RGVqYVZ1U2Fucy1Cb2xkIC9DSURTeXN0ZW1JbmZvIDE4IDAgUiAvQ0lEVG9HSURNYXAgL0lkZW50\n' +
  'aXR5IC9EVyA2MDAgL0ZvbnREZXNjcmlwdG9yIDExIDAgUiAvU3VidHlwZSAvQ0lERm9udFR5cGUy\n' +
  'IC9UeXBlIC9Gb250IC9XIFszNiBbNzczXSAzOSBbODMwIDY4M10gNDUgWzM3MiA3NzQgNjM3IDk5\n' +
  'NSA4MzZdIDUxIFs3MzJdIDUzIFs3NzAgNzIwIDY4MiA4MTJdIDU4IFsxMTAzXSA2OCBbNjc0IDcx\n' +
  'NV0gNzEgWzcxNSA2NzhdIDc5IFszNDJdIDgyIFs2ODcgNzE1XSA4NSBbNDkzXSA4OSBbNjUxXV0+\n' +
  'Pg1lbmRvYmoNMTEgMCBvYmoNPDwvQXNjZW50IDExNzQgL0F2Z1dpZHRoIDU3MiAvQ2FwSGVpZ2h0\n' +
  'IDAgL0Rlc2NlbnQgLTQxNSAvRmxhZ3MgMzIgL0ZvbnRCQm94IFstMTA2OSAtNDE1IDE5NzUgMTE3\n' +
  'NF0gL0ZvbnRGYW1pbHkgKERlamFWdSBTYW5zKSAvRm9udEZpbGUyIDEyIDAgUiAvRm9udE5hbWUg\n' +
  'L1VDSkhaUCtEZWphVnVTYW5zLUJvbGQgL0ZvbnRTdHJldGNoIC9Ob3JtYWwgL0ZvbnRXZWlnaHQg\n' +
  'NzAwIC9JdGFsaWNBbmdsZSAwIC9NYXhXaWR0aCAyMDE2IC9NaXNzaW5nV2lkdGggNjAwIC9TdGVt\n' +
  'ViA2MCAvVHlwZSAvRm9udERlc2NyaXB0b3IgL1hIZWlnaHQgMD4+DWVuZG9iag0xMiAwIG9iag08\n' +
  'PC9GaWx0ZXIgL0ZsYXRlRGVjb2RlIC9MZW5ndGggMTQ4NzggL0xlbmd0aDEgNTY4MDg+Pg0Kc3Ry\n' +
  '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\n' +
  'Ntr9xRDwIuXhMl9qhTzsj17GPuMvpkIWfEoqgqQ15uTJUJHIkiKRECSn1YNY1eKkaAaJ6lqI7kSI\n' +
  'xZqyrYZ3bZCg8jZSdpVEqD7mxeAtltr4EmOjPYZJfHfEw9H7PS+aXiOKrJg4uTWpngNlbvl3y11J\n' +
  'tlIlJ0uxc5BKhDlLczlviUm8uOngpvcukfx0fXFm3KX1edPEhBeeKivV87ePHc6FHNt0rK3Jej6M\n' +
  'rvd89TiWIF1LZZqQhGsGduNYb4wsGKrHsYuWFrpOZsyRrauQUXO3xzBUK7fNme92+a9UxuCXoTXT\n' +
  'fFp/rVCbrS3SVmub3d9u/N7F7y/q9z1+yYIgYdyrJ1B1VovX1C+huqwhb6C3ppasHW+nN7O6UTfW\n' +
  'nXfX861pxt3sHn63uMdYSkvZo/xRfYlYbqzn29jLvG5A27PMdFYIsU5kN9tX2VP1/NISbvyyGiLx\n' +
  '/wB2zUxjDQplbmRzdHJlYW0NZW5kb2JqDTIgMCBvYmoNPDwvQ291bnQgMSAvS2lkcyBbNiAwIFJd\n' +
  'IC9UeXBlIC9QYWdlcz4+DWVuZG9iag00IDAgb2JqDTw8L05hbWVzIFtdPj4NZW5kb2JqDTUgMCBv\n' +
  'YmoNPDw+Pg1lbmRvYmoNeHJlZg0KMCAxOQ0KMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAwMDE2\n' +
  'IDAwMDAwIG4NCjAwMDAwNDA1NTIgMDAwMDAgbg0KMDAwMDAwMDEwMyAwMDAwMCBuDQowMDAwMDQw\n' +
  'NjA3IDAwMDAwIG4NCjAwMDAwNDA2MzYgMDAwMDAgbg0KMDAwMDAwMDM3NiAwMDAwMCBuDQowMDAw\n' +
  'MDAwNTE0IDAwMDAwIG4NCjAwMDAwMjQzOTEgMDAwMDAgbg0KMDAwMDAyNDUzNyAwMDAwMCBuDQow\n' +
  'MDAwMDI0OTM3IDAwMDAwIG4NCjAwMDAwMjUyNjAgMDAwMDAgbg0KMDAwMDAyNTU4MyAwMDAwMCBu\n' +
  'DQowMDAwMDAzNDY1IDAwMDAwIG4NCjAwMDAwMDM2MDggMDAwMDAgbg0KMDAwMDAwNDIzMCAwMDAw\n' +
  'MCBuDQowMDAwMDA0Njc1IDAwMDAwIG4NCjAwMDAwMDQ5OTMgMDAwMDAgbg0KMDAwMDAwNDE1NyAw\n' +
  'MDAwMCBuDQp0cmFpbGVyPDwvU2l6ZSAxOSAvUm9vdCAxIDAgUiAvSW5mbyAzIDAgUiAvSUQgWzxk\n' +
  'NDc3Mjg1MGY2MzI0N2VlODAyYzMwMzY5ZjA3NTI2YT48ZWViNTM2M2FkYWM4NDI5Zjg2MGNiY2Mx\n' +
  'ZTJiMTdjZTY+XT4+DXN0YXJ0eHJlZg00MDY1Ng0lJUVPRg0='
);

var canvas = document.getElementById('pdf-canvas');

// Asynchronous download PDF
pdfjsLib.getDocument({data: pdfData})
  .then(function(pdf) {
    return pdf.getPage(1);
  })
  .then(function(page) {
    // Set scale (zoom) level
    var scale = 1.0;

    // Get viewport (dimensions)
    var viewport = page.getViewport(scale);

    // Fetch canvas' 2d context
    var context = canvas.getContext('2d');

    // Set dimensions to Canvas
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Prepare object needed by render method
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    // Render PDF page
    page.render(renderContext);
  });

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "#pdf-signature",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
        Math.pow(event.pageY - event.y0, 2) | 0))
          .toFixed(2) + 'px');
    }
  });

function dragMoveListener (event) {
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

interact('.dropzone')
  .dropzone({
    accept: '.signature',
    overlap: 1.00,

    // listen for drop related events:
    ondropactivate: function (event) {
      // add active dropzone feedback
    },
    ondragenter: function (event) {
      toastr["info"]("Yapss, lepaskan untuk menambahkan tanda tangan");

      console.log('Lepaskan untuk membubuhkan tanda tangan');
    },
    ondragleave: function (event) {
      toastr["error"]("Tanda tangan tidak boleh keluar dari dokumen");

      console.log('Tanda tangan tidak boleh keluar dari dokumen');
    },
    ondrop: function (event) {
      const canvasRect = canvas.getBoundingClientRect();
      const elementRect = event.relatedTarget.getBoundingClientRect();
      const offset = {
        x: elementRect.x - canvasRect.x,
        y: elementRect.y - canvasRect.y,
      };

      toastr["success"]("Posisi tanda tangan berada di x: " + offset.x + " dan y: " + offset.y);

      console.log('Signatured position', offset);
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
    }
  });
