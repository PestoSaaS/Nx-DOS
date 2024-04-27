import styles from './decorative-border.module.css';

const horizontalBorder = '\u2500'.repeat(150);
const verticalBorder = '\u2502'.repeat(150);

export function DecorativeBorder(): JSX.Element {
  return (
    // opted to use the object tag as a workaround to hide unwanted
    // elements from reader mode, as aria-hidden don't work on Safari
    <object
      className={styles['lineBorderFrame'] + ' lineBorderFrame'}
      aria-hidden="true"
    >
      <div
        className={
          styles['lineBorder-corner'] +
          ' ' +
          styles['lineBorder-corner--top-left']
        }
      />
      <div
        className={
          styles['lineBorder-corner'] +
          ' ' +
          styles['lineBorder-corner--top-right']
        }
      />
      <div
        className={
          styles['lineBorder-corner'] +
          ' ' +
          styles['lineBorder-corner--bottom-left']
        }
      />
      <div
        className={
          styles['lineBorder-corner'] +
          ' ' +
          styles['lineBorder-corner--bottom-right']
        }
      />

      <div className={styles['lineBorder--top'] + ' ' + styles['lineBorder']}>
        {horizontalBorder}
      </div>
      <div
        className={styles['lineBorder--bottom'] + ' ' + styles['lineBorder']}
      >
        {horizontalBorder}
      </div>
      <object
        className={
          styles['lineBorder--left'] +
          ' ' +
          styles['lineBorder'] +
          ' w-[1ch] [word-break:break-word] overflow-hidden '
        }
      >
        {verticalBorder}
      </object>
      <object
        className={
          styles['lineBorder--right'] +
          ' ' +
          styles['lineBorder'] +
          ' w-[1ch] [word-break:break-word] overflow-hidden '
        }
      >
        {verticalBorder}
      </object>
    </object>
  );
}
