// class MoonrakerCard extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: 'open' });
//     }
  
//     setConfig(config) {
//       if (!config.entities) {
//         throw new Error('You need to define entities');
//       }
//       this.config = config;
//       this.renderCard();
//     }
  
//     set hass(hass) {
//       this._hass = hass; // Store the hass object
//       this.renderCard(); // Call render whenever hass is updated
//     }
  
//     renderCard() {
//       if (!this.shadowRoot || !this._hass) return; // Ensure both are defined
  
//       const entities = this.config.entities;
//       const iconDirectory = this.config.icons || "/hacsfiles/moonraker-card";
  
//       // Safely access states, log the states for debugging
//       const status = this._hass.states[entities.status]?.state || 'Unknown';
//       const temperature = this._hass.states[entities.temperature]?.state || '--';
//       const progress = this._hass.states[entities.progress]?.state || '--';
//       const currentLayer = this._hass.states[entities.current_layer]?.state || '--';
  
//       console.log("Current states:", this._hass.states); // Debugging line

//       // Render the card
//       this.shadowRoot.innerHTML = `
//         <style>
//             ha-card {
//             padding: 16px;
//             background-color: #f2f2f2;
//             border-radius: 12px;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//             font-family: Arial, sans-serif;
//             text-align: center;
//             color: #333;
//             }
//             .header {
//             font-size: 1.2em;
//             font-weight: bold;
//             color: #666;
//             margin-bottom: 8px;
//             }
//             .aqi-container {
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//             background-color: #a8e5a2;
//             border-radius: 12px;
//             padding: 10px;
//             color: #333;
//             }
//             .aqi-container .icon {
//             width: 48px;
//             height: 48px;
//             border-radius: 50%;
//             background-color: #fff;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 1.5em;
//             }
//             .aqi-info {
//             flex: 1;
//             text-align: center;
//             }
//             .aqi-info .aqi-value {
//             font-size: 2em;
//             font-weight: bold;
//             }
//             .aqi-info .aqi-status {
//             font-size: 1.1em;
//             color: #fff;
//             font-weight: bold;
//             }
//             .extra-info {
//             display: flex;
//             justify-content: space-around;
//             margin-top: 8px;
//             color: #777;
//             }
//             .extra-info-item {
//             display: flex;
//             align-items: center;
//             }
//             .extra-info-item img {
//             width: 24px;
//             height: 24px;
//             margin-right: 8px;
//             }
//         </style>
//         <ha-card>
//             <div class="header">Printer Status</div>
//             <div class="extra-info">
//             <div class="status" id="status" style="background-color: #FDD64B;">
//                 <img src="${iconDirectory}/printer_icon.png"></img>
//                 <span>Printer Status: ${status}</span>
//             </div>
//             <div class="extra-info-item">
//                 <img src="${iconDirectory}/temperature_icon.png" alt="Temperature Icon" width="40" height="40" />
//                 <span>${temperature}</span>
//             </div>
//             <div class="extra-info-item">
//                 <img src="${iconDirectory}/humidity_icon.png" alt="Humidity Icon" width="40" height="40" />
//                 <span>${humidity}</span>
//             </div>
//             <div class="extra-info-item">
//                 <img src="${iconDirectory}/wind_icon.png" alt="Wind Speed Icon" width="40" height="40" />
//                 <span>${windSpeed}</span>
//             </div>
//             </div>
//         </ha-card>
//       `;
//     }
  
//     getCardSize() {
//       return 3;
//     }
//   }
  
//   customElements.define('moonraker-card', MoonrakerCard);
  

class MoonrakerCard extends HTMLElement {
  setConfig(config) {
    this.config = config;
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {

    const iconDirectory = this.config.icons || "/hacsfiles/moonraker-card";
    const imagePath = iconDirectory + "/V2.4.jpg";

    const card = document.createElement('ha-card');
    card.style.borderRadius = '20px';

    // Set the card's title
    const title = document.createElement('div');
    title.textContent = this.config.title || 'Custom Card';
    card.appendChild(title);

    // Set up the first button card for "kratos"
    const button1 = document.createElement('hui-button-card');
    button1.setConfig({
      template: 'card_title',
      name: 'kratos',
      type: 'custom:button-card',
    });
    card.appendChild(button1);

    // Create a container for the vertical stack and image
    const verticalStack = document.createElement('hui-vertical-stack-card');
    verticalStack.setConfig({
      cards: [
        {
          type: 'horizontal-stack',
          cards: [
            {
              type: 'picture',
              image: imagePath,
              tap_action: { action: 'none' },
              hold_action: { action: 'none' },
              style: 'ha-card { --paper-card-background-color: rgba(0, 0, 0, 0.0); --ha-card-background: rgba(0, 0, 0, 0.0); --ha-card-box-shadow: none; }',
            },
            {
              type: 'vertical-stack',
              cards: [
                {
                  type: 'custom:button-card',
                  layout: 'icon_name_state2nd',
                  entity: 'sensor.kratos_voron_current_print_state',
                  name: 'Print State',
                  icon: 'mdi:state-machine',
                  show_icon: true,
                  show_state: true,
                  styles: {
                    grid: ['grid-template-columns: 50px auto'],
                    icon: ['padding: 10px 10px', 'height: 30px', 'width: 30px'],
                    card: ['--ha-card-background: rgba(0, 0, 0, 0.0)', '--ha-card-box-shadow: none'],
                    state: ['padding: 0px 10px', 'justify-self: start', 'font-family: Roboto, sans-serif', 'font-size: 15px'],
                    name: ['padding: 0px 10px', 'justify-self: start', 'color: var(--secondary-text-color)'],
                  },
                },
                {
                  type: 'custom:button-card',
                  layout: 'icon_name_state2nd',
                  entity: 'sensor.kratos_voron_printer_state',
                  name: 'Status',
                  icon: 'mdi:list-status',
                  show_icon: true,
                  show_state: true,
                  styles: {
                    grid: ['grid-template-columns: 50px auto'],
                    icon: ['padding: 10px 10px', 'height: 30px', 'width: 30px'],
                    card: ['--ha-card-background: rgba(0, 0, 0, 0.0)', '--ha-card-box-shadow: none'],
                    state: ['padding: 0px 10px', 'justify-self: start', 'font-family: Roboto, sans-serif', 'font-size: 15px'],
                    name: ['padding: 0px 10px', 'justify-self: start', 'color: var(--secondary-text-color)'],
                  },
                },
                {
                  type: 'custom:button-card',
                  layout: 'icon_name_state2nd',
                  entity: 'sensor.kratos_voron_totals_jobs',
                  name: 'Total Jobs',
                  icon: 'mdi:tally-mark-5',
                  show_icon: true,
                  show_state: true,
                  styles: {
                    grid: ['grid-template-columns: 50px auto'],
                    icon: ['padding: 10px 10px', 'height: 30px', 'width: 30px'],
                    card: ['--ha-card-background: rgba(0, 0, 0, 0.0)', '--ha-card-box-shadow: none'],
                    state: ['padding: 0px 10px', 'justify-self: start', 'font-family: Roboto, sans-serif', 'font-size: 15px'],
                    name: ['padding: 0px 10px', 'justify-self: start', 'color: var(--secondary-text-color)'],
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    card.appendChild(verticalStack);
    this.shadowRoot.appendChild(card);
  }
}

customElements.define('moonraker-card', MoonrakerCard);
