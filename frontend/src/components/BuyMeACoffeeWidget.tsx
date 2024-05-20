import { useEffect } from 'react';

export function BuyMeACoffeeWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    const div = document.querySelector('#BMC-widget')!;

    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';

    script.async = true;
    script.setAttribute('data-name', 'BMC-Widget');
    script.setAttribute('data-cfasync', 'false');
    script.setAttribute('data-id', 'tastybites');
    script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    script.setAttribute(
      'data-message',
      'Thank you for visiting. You can now buy me a coffee!',
    );
    script.setAttribute('data-color', '#5F7FFF');
    script.setAttribute('data-position', 'Right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');

    document.head.appendChild(script);

    script.onload = function () {
      const evt = document.createEvent('Event');
      evt.initEvent('DOMContentLoaded', false, false);
      window.dispatchEvent(evt);
    };

    div.appendChild(script);

    return () => {
      div.removeChild(script);
      const btns = document.querySelectorAll('#bmc-wbtn');
      if (btns.length > 0) {
        btns.forEach((btn) => {
          btn.remove();
        });
      }
    };
  }, []);

  return <div id="BMC-widget"></div>;
}
