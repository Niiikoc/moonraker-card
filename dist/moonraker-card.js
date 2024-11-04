class MoonrakerCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    setConfig(config) {
      if (!config.entities) {
        throw new Error('You need to define entities');
      }
      this.config = config;
      this.renderCard();
    }
  
    set hass(hass) {
      this._hass = hass; // Store the hass object
      this.renderCard(); // Call render whenever hass is updated
    }
  
    renderCard() {
      if (!this.shadowRoot || !this._hass) return; // Ensure both are defined
  
      const entities = this.config.entities;
      const printerIcon = "./printer_icon.png";
      const temperatureIcon = "./temperature_icon.png";
      const progressIcon = "./progress_icon.png";
      const layerIcon = "./layer_icon.png";
  
      // Safely access states, log the states for debugging
      const status = this._hass.states[entities.status]?.state || 'Unknown';
      const temperature = this._hass.states[entities.temperature]?.state || '--';
      const progress = this._hass.states[entities.progress]?.state || '--';
      const currentLayer = this._hass.states[entities.current_layer]?.state || '--';
  
      console.log("Current states:", this._hass.states); // Debugging line
  
      // Render the card
      this.shadowRoot.innerHTML = `
        <style>
          ha-card {
            padding: 20px;
            background-color: #333;
            color: #fff;
            border-radius: 12px;
            background-image: url("./images/3d_printer_bg.jpg");
            background-size: cover;
            background-position: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          .status {
            font-size: 1.5em;
            font-weight: bold;
            color: #ff9800;
            margin-bottom: 16px;
            text-align: center;
          }
          .info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            padding: 8px;
          }
          .info-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
          }
          .info-item span {
            font-size: 1.1em;
          }
          .icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
            filter: invert(1);
          }
        </style>
        <ha-card>
          <div class="status">
            <img class="icon" src="${printerIcon}" alt="Printer" />
            Printer Status: ${status}
          </div>
          <div class="info">
            <div class="info-item">
              <img class="icon" src="${temperatureIcon}" alt="Temperature" />
              <span>Temperature: ${temperature} °C</span>
            </div>
            <div class="info-item">
              <img class="icon" src="${progressIcon}" alt="Progress" />
              <span>Progress: ${progress}%</span>
            </div>
            <div class="info-item">
              <img class="icon" src="${layerIcon}" alt="Layer" />
              <span>Current Layer: ${currentLayer}</span>
            </div>
          </div>
        </ha-card>
      `;
    }
  
    getCardSize() {
      return 3;
    }
  }
  
  customElements.define('moonraker-card', MoonrakerCard);
  