class IdeaGenerator {
    constructor(ideas, ideaTextElement, generateButtonElement, saveIdeaButtonElement, savedIdeasListElement, categorySelectElement, addIdeaButtonElement, ideaInput, categoryInput, clearSavedButtonElement) { // Добавляем новый элемент
        this.ideas = ideas;
        this.ideaTextElement = ideaTextElement;
        this.generateButtonElement = generateButtonElement;
        this.saveIdeaButtonElement = saveIdeaButtonElement;
        this.savedIdeasListElement = savedIdeasListElement;
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

    loadSavedIdeas() {
        const saved = localStorage.getItem('leisureIdeas');
        return saved ? JSON.parse(saved) : [];
    }

    updateSavedIdeas() {
        localStorage.setItem('leisureIdeas', JSON.stringify(this.savedIdeas));
    }

    displaySavedIdeas() {
        this.savedIdeasListElement.innerHTML = '';
        this.savedIdeas.forEach(idea => {
            const listItem = document.createElement('li');
            listItem.textContent = idea;
            this.savedIdeasListElement.appendChild(listItem);
        });
    }

    populateCategories() {
        const categories = [...new Set(this.ideas.map(idea => idea.category))];
        this.categorySelectElement.innerHTML = '<option value="">Все категории</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            this.categorySelectElement.appendChild(option);
        });
    }

    addIdea() {
        const newIdeaText = this.ideaInput.value.trim();
        const newIdeaCategory = this.categoryInput.value.trim();

        if (newIdeaText === "") {
            alert("Пожалуйста, введите текст идеи.");
            return;
        }

        if (newIdeaCategory === "") {
            alert("Пожалуйста, введите категорию идеи.");
            return;
        }

        const newIdea = { text: newIdeaText, category: newIdeaCategory };
        this.ideas.push(newIdea);
        this.populateCategories();
        this.ideaInput.value = '';
        this.categoryInput.value = '';
    }

    clearSavedIdeas() { 
        this.savedIdeas = []; 
        this.updateSavedIdeas(); 
        this.displaySavedIdeas(); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ideasData = [
        { text: "kicijek trenirofka etmek yada mask.", category: "Активность" },
        { text: "Parkda aylanmak.", category: "Активность" },
        { text: "kitap okamak.", category: "Досуг" },
        { text: "Посмотреть серию любимого сериала или новый фильм.", category: "Досуг" },
        { text: "Послушать спокойную музыку или подкаст.", category: "Досуг" },
        { text: "Приготовить что-нибудь вкусное по новому рецепту.", category: "Творчество" },
        { text: "Нарисовать скетч или попробовать раскраску для взрослых.", category: "Творчество" },
        { text: "Позвонить другу или родственнику, с которым давно не общались.", category: "Общение" },
        { text: "Сделать небольшую уборку или организовать рабочее пространство.", category: "Быт" },
        { text: "Позаниматься медитацией или дыхательными упражнениями.", category: "Здоровье" },
        { text: "Изучить новую тему или навык онлайн.", category: "Обучение" },
        { text: "Поиграть в настольную игру или головоломку.", category: "Досуг" },
        { text: "Послушать аудиокнигу.", category: "Досуг" },
        { text: "Написать письмо или открытку кому-нибудь.", category: "Творчество" },
        { text: "Сделать несколько фотографий интересных моментов.", category: "Творчество" },
        { text: "Попробовать свои силы в написании стихов или коротких рассказов.", category: "Творчество" },
        { text: "Заняться йогой или растяжкой.", category: "Здоровье" },
        { text: "Посетить виртуальный тур по музею или зоопарку.", category: "Обучение" },
        { text: "Посмотреть обучающее видео по интересующей теме.", category: "Обучение" },
        { text: "Сделать что-то приятное для себя.", category: "Досуг" }
            ];

            const ideaTextElement = document.getElementById('ideaText');
            const generateButtonElement = document.getElementById('generateButton');
            const saveIdeaButtonElement = document.getElementById('saveIdeaButton');
            const savedIdeasListElement = document.getElementById('savedIdeasList');
            const categorySelectElement = document.getElementById('categorySelect');
            const addIdeaButtonElement = document.getElementById('addIdeaButton');
            const ideaInput = document.getElementById('ideaInput');
            const categoryInput = document.getElementById('categoryInput');
            const clearSavedButtonElement = document.getElementById('clearSavedButton'); 


            const generator = new IdeaGenerator(ideasData, ideaTextElement, generateButtonElement, saveIdeaButtonElement, savedIdeasListElement, categorySelectElement, addIdeaButtonElement, ideaInput, categoryInput, clearSavedButtonElement); // Передаем новый элемент в конструктор
        });