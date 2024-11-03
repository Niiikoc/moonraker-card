class MoonrakerCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    setConfig(config) {
      this.config = config;
      this.renderCard();
    }
  
    // Define the `hass` setter to receive the Home Assistant instance
    set hass(hass) {
      this._hass = hass;
      // Render or update the card whenever hass is set
      this.renderCard();
    }
  
    // Method to render the card
    renderCard() {
      if (!this.shadowRoot) return;
      const entities = this.config.entities;
  
      // Check if `hass` is defined before trying to access it
      if (!this._hass) {
        console.error("Home Assistant instance (hass) is not available.");
        return;
      }
  
      // Example usage of hass states
      const status = this._hass.states[entities.status]?.state || 'Unknown';
      const temperature = this._hass.states[entities.temperature]?.state || '--';
      const progress = this._hass.states[entities.progress]?.state || '--';
      const currentLayer = this._hass.states[entities.current_layer]?.state || '--';
  
      // Define the card's HTML structure and styles
      this.shadowRoot.innerHTML = `
        <style>
          ha-card {
            padding: 16px;
            background-color: var(--primary-background-color);
            color: var(--primary-text-color);
            border-radius: var(--ha-card-border-radius, 4px);
          }
          .status {
            font-size: 1.2em;
            margin-bottom: 16px;
          }
          .info {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .info-item {
            display: flex;
            justify-content: space-between;
          }
        </style>
        <ha-card>
          <div class="status">
            Printer Status: ${status}
          </div>
          <div class="info">
            <div class="info-item">
              <span>Temperature:</span>
              <span>${temperature} °C</span>
            </div>
            <div class="info-item">
              <span>Progress:</span>
              <span>${progress}%</span>
            </div>
            <div class="info-item">
              <span>Current Layer:</span>
              <span>${currentLayer}</span>
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
  