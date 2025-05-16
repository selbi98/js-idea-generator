class IdeaGenerator {
    constructor(ideas, ideaTextElement, generateButtonElement, saveIdeaButtonElement, saveIdeaListElement, categorySelectElement, addIdeaButtonElement, ideaInput, categoryInput, clearSavedButtonElement){
    this.ideas = ideas;
    this.ideaTextElement = ideaTextElement;
    this.generateButtonElement = generateButtonElement;
    this.saveIdeaButtonElement = saveIdeaButtonElement;
    this.saveIdeaListElement = saveIdeaListElement;
    this.categorySelectElement = categorySelectElement;
    this.addIdeaButtonElement = addIdeaButtonElement;
    this.ideaInput = ideaInput;
    this.categoryInput = categoryInput;
    this.clearSavedButtonElement = clearSavedButtonElement;
    this.savedIdeas = this.loadSavedIdeas();
    this.currentIdea = null;

    this.generateButtonElement.addEventListener('click', this.generateAndDisplayIdea.bind(this));
    this.saveIdeaButtonElement.addEventListener('click', this.saveCurrentIdea.bind(this));
    this.addIdeaButtonElement.addEventListener('click', this.addIdea.bind(this));
    this.clearSavedButtonElement.addEventListener('click', this.clearSavedIdeas.bind(this));
    this.displaySavedIdeas();
    this.populateCategories();
    }

    getRandomIdea(category) {
        let filteredIdeas = this.ideas;
        if (category) {
            filteredIdeas = this.ideas.filter(idea => idea.category === category);
        }
        if (filteredIdeas.length === 0) {
            return { text: "Нет идей в этой категории.", category: "" };
        }
        const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
        return filteredIdeas[randomIndex];
    }

    generateAndDisplayIdea() {
        const selectedCategory = this.categorySelectElement.value;
        this.currentIdea = this.getRandomIdea(selectedCategory);
        this.ideaTextElement.textContent = this.currentIdea.text;
    }

    saveCurrentIdea() {
        if (this.currentIdea && !this.savedIdeas.includes(this.currentIdea.text)) {
            this.savedIdeas.push(this.currentIdea.text);
            this.updateSavedIdeas();
            this.displaySavedIdeas();
        }
    }
}

   