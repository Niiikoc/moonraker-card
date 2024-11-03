class MoonrakerCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    setConfig(config) {
      this.config = config;
      this.renderCard(); // Call render initially with config
    }
  
    set hass(hass) {
      this._hass = hass;
      // Ensure the card renders whenever hass is updated
      this.renderCard();
    }
  
    renderCard() {
      if (!this.shadowRoot || !this._hass) return; // Ensure shadowRoot and _hass are defined
  
      const entities = this.config.entities;
  
      // Safely access states with error handling
      const status = this._hass.states[entities.status]?.state || 'Unknown';
      const temperature = this._hass.states[entities.temperature]?.state || '--';
      const progress = this._hass.states[entities.progress]?.state || '--';
      const currentLayer = this._hass.states[entities.current_layer]?.state || '--';
  
      // Updated CSS and HTML structure
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
            <img class="icon" src="./images/printer_icon.png" alt="Printer" />
            Printer Status: ${status}
          </div>
          <div class="info">
            <div class="info-item">
              <img class="icon" src="./images/temperature_icon.png" alt="Temperature" />
              <span>Temperature: ${temperature} °C</span>
            </div>
            <div class="info-item">
              <img class="icon" src="./images/progress_icon.png" alt="Progress" />
              <span>Progress: ${progress}%</span>
            </div>
            <div class="info-item">
              <img class="icon" src="./images/layer_icon.png" alt="Layer" />
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
  