import { EN, GROUPED_TYPE, ID, QUANTITYx, SET } from '@/constants';
import { countCards, cryptSort, getCardImageUrl, librarySort } from '@/utils';

export const proxyCards = async (
  crypt,
  library,
  format,
  cryptSortMethod = QUANTITYx,
  lang = EN,
  showLegacyImage = false,
  name = 'Deck',
) => {
  const cryptSorted = cryptSort(
    Object.values(crypt).filter((card) => card.q > 0),
    cryptSortMethod,
  );

  const librarySorted = librarySort(
    Object.values(library).filter((card) => card.q > 0),
    GROUPED_TYPE,
  );

  const cardsTotal = countCards([...cryptSorted, ...librarySorted]);
  const cards = [...cryptSorted, ...librarySorted].map((card) => {
    return {
      [ID]: card.c[ID],
      [SET]: card[SET],
      url: getCardImageUrl(card.c, card[SET], lang),
      q: card.q,
    };
  });

  const sheetW = format.isLetter ? 215.9 : 210;
  const sheetH = format.isLetter ? 279.4 : 297;

  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF('p', 'mm', [sheetW, sheetH]);

  const w = 63;
  const h = 88;
  const gap = 0.25;
  const marginLeft = (sheetW - w * 3 - gap * 2) / 2;
  const marginTop = format.isLetter
    ? (sheetH - h * 3 - gap * 2) / 2
    : (sheetW - w * 3 - gap * 2) / 2;

  let counterX = 0;
  let counterY = 0;
  let page = 1;

  const drawBorders = () => {
    if (format.isWhite) {
      pdf.setFillColor(255, 255, 255);
    } else {
      pdf.setFillColor(60, 60, 60);
    }

    const cutLineGap = 1;

    pdf.line(cutLineGap, marginTop, sheetW - cutLineGap, marginTop);
    pdf.line(
      cutLineGap,
      marginTop + h * 1 + gap * 0.5,
      sheetW - cutLineGap,
      marginTop + h * 1 + gap * 0.5,
    );
    pdf.line(
      cutLineGap,
      marginTop + h * 2 + gap * 1.5,
      sheetW - cutLineGap,
      marginTop + h * 2 + gap * 1.5,
    );
    pdf.line(
      cutLineGap,
      marginTop + h * 3 + gap * 2,
      sheetW - cutLineGap,
      marginTop + h * 3 + gap * 2,
    );
    pdf.line(marginLeft, cutLineGap, marginLeft, sheetH - cutLineGap);
    pdf.line(
      marginLeft + w * 1 + gap * 0.5,
      cutLineGap,
      marginLeft + w * 1 + gap * 0.5,
      sheetH - cutLineGap,
    );
    pdf.line(
      marginLeft + w * 2 + gap * 1.5,
      cutLineGap,
      marginLeft + w * 2 + gap * 1.5,
      sheetH - cutLineGap,
    );
    pdf.line(
      marginLeft + w * 3 + gap * 2,
      cutLineGap,
      marginLeft + w * 3 + gap * 2,
      sheetH - cutLineGap,
    );
  };

  drawBorders();

  Object.values(cards).forEach(async (card) => {
    const img = new Image();
    for (let i = 0; i < card.q; i++) {
      pdf.rect(
        marginLeft + counterX * (w + gap),
        marginTop + counterY * (h + gap),
        w + (counterX < 2 ? gap : 0),
        h + (counterY < 2 ? gap : 0),
        'F',
      );

      try {
        if (lang !== EN || card[SET] || showLegacyImage) {
          const url = card[SET]
            ? card.url.otherUrl
            : showLegacyImage && card[ID] > 200000
              ? card.url.legacyUrl
              : card.url.otherUrl;

          if (!url) throw null;
          img.src = `${url}.jpg`;
          pdf.addImage(
            img,
            'JPEG',
            (w + gap) * counterX + marginLeft,
            (h + gap) * counterY + marginTop,
            w,
            h,
          );
        } else {
          throw null;
        }
      } catch {
        img.src = `${card.url.baseUrl}.jpg`;
        pdf.addImage(
          img,
          'JPEG',
          (w + gap) * counterX + marginLeft,
          (h + gap) * counterY + marginTop,
          w,
          h,
        );
      }

      if (counterX == 2) {
        counterY += 1;
        counterX = 0;
      } else {
        counterX += 1;
      }

      if (counterY == 3 && page * 9 < cardsTotal) {
        page += 1;
        counterY = 0;
        pdf.addPage();
        drawBorders();
      }
    }
  });

  pdf.save(`${name}.pdf`);
};
