class MoonrakerCard extends HTMLElement {
    setConfig(config) {
      this.config = config;
      this.attachShadow({ mode: "open" });
      this.renderCard();
    }
  
    set hass(hass) {
      this._hass = hass;
  
      if (this.config.entities) {
        this.renderCard();
      }
    }
  
    renderCard() {
      if (!this.shadowRoot) return;
      const entities = this.config.entities;
  
      // Create a shadow DOM template with HTML and style
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
            Printer Status: ${hass.states[entities.status]?.state || "Unknown"}
          </div>
          <div class="info">
            <div class="info-item">
              <span>Temperature:</span>
              <span>${hass.states[entities.temperature]?.state || "--"} °C</span>
            </div>
            <div class="info-item">
              <span>Progress:</span>
              <span>${hass.states[entities.progress]?.state || "--"}%</span>
            </div>
            <div class="info-item">
              <span>Current Layer:</span>
              <span>${hass.states[entities.current_layer]?.state || "--"}</span>
            </div>
          </div>
        </ha-card>
      `;
    }
  
    getCardSize() {
      return 3;
    }
  }
  
  // Register the custom card with Home Assistant
  customElements.define("moonraker-card", MoonrakerCard);
  