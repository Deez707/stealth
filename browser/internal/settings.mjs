
import { ENVIRONMENT } from '../source/ENVIRONMENT.mjs';
import { Element     } from '../design/Element.mjs';
import { Widget      } from '../design/Widget.mjs';
import { Interface   } from '../design/card/Interface.mjs';
import { Internet    } from '../design/card/Internet.mjs';



const render_widget = (widget) => {

	let body = Element.query('body');
	if (body !== null && widget !== null) {

		widget.render(body);
		widget.emit('show');

	}

};



let browser = window.parent.BROWSER || null;
if (browser !== null) {

	let elements = {};
	let widgets  = {};


	elements['profile'] = Element.query('[data-key="profile"]');

	if (elements['profile'] !== null) {

		browser.client.services['settings'].info(null, (response) => {

			if (response.profile !== null) {
				elements['profile'].value(response.profile);
			}

		});

	}


	widgets['interface'] = Interface.from(browser.settings['interface']);
	widgets['internet']  = Internet.from(browser.settings['internet']);

	render_widget(widgets['interface']);
	render_widget(widgets['internet']);


	if (ENVIRONMENT.flags.debug === true) {

		window.ELEMENTS = elements;
		window.WIDGETS  = widgets;

		window.Element = Element;
		window.Widget  = Widget;

	}

}
