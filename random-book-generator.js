Hooks.on('ready', () => {
    console.log('Random Book Generator module is ready');
  
    game.randomBookGenerator = {
      createBook: async () => {
        const sizeTable = await game.tables.getName('Book Size and Format');
        const bindingTable = await game.tables.getName('Binding Material');
        const languageTable = await game.tables.getName('Language');
        const contentTable = await game.tables.getName('Contents');
        const illustrationTable = await game.tables.getName('Illustrations');
        const magicalPropertyTable = await game.tables.getName('Magical Properties');
        const authorTable = await game.tables.getName('Authorship');
        const ownershipTable = await game.tables.getName('Previous Ownership');
        const readabilityTable = await game.tables.getName('Readability');
        const specialFeatureTable = await game.tables.getName('Special Features');
  
        const size = await sizeTable.roll().results[0].text;
        const binding = await bindingTable.roll().results[0].text;
        const language = await languageTable.roll().results[0].text;
        const content = await contentTable.roll().results[0].text;
        const illustration = await illustrationTable.roll().results[0].text;
        const magicalProperty = await magicalPropertyTable.roll().results[0].text;
        const author = await authorTable.roll().results[0].text;
        const ownership = await ownershipTable.roll().results[0].text;
        const readability = await readabilityTable.roll().results[0].text;
        const specialFeature = await specialFeatureTable.roll().results[0].text;
  
        let bookDescription = `
          <h2>Generated Book</h2>
          <p><strong>Size and Format:</strong> ${size}</p>
          <p><strong>Binding Material:</strong> ${binding}</p>
          <p><strong>Language:</strong> ${language}</p>
          <p><strong>Contents:</strong> ${content}</p>
          <p><strong>Illustrations:</strong> ${illustration}</p>
          <p><strong>Magical Properties:</strong> ${magicalProperty}</p>
          <p><strong>Author:</strong> ${author}</p>
          <p><strong>Previous Ownership:</strong> ${ownership}</p>
          <p><strong>Readability:</strong> ${readability}</p>
          <p><strong>Special Features:</strong> ${specialFeature}</p>
        `;
  
        new Dialog({
          title: "Random Book Generator",
          content: bookDescription,
          buttons: {
            ok: {
              label: "OK"
            }
          }
        }).render(true);
      }
    };
  
    game.settings.registerMenu("random-book-generator", "openGenerator", {
      name: "Open Random Book Generator",
      label: "Generate Book",
      hint: "Opens the Random Book Generator dialog.",
      icon: "fas fa-book",
      type: RandomBookGeneratorForm,
      restricted: false
    });
  });
  
  class RandomBookGeneratorForm extends FormApplication {
    activateListeners(html) {
      super.activateListeners(html);
      html.find('.generate-book').click(() => {
        game.randomBookGenerator.createBook();
      });
    }
    
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        id: "random-book-generator-form",
        title: "Random Book Generator",
        template: "modules/random-book-generator/templates/random-book-generator.html",
        width: 400
      });
    }
  
    getData() {
      return {};
    }
  
    async _updateObject(event, formData) {
      // No need to do anything here
    }
  }
  