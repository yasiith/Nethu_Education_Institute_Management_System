// scripts/seedEducationalContent.js
require('dotenv').config();
const mongoose = require('mongoose');
const EducationalContent = require('../models/educationalContent');

// Connect to MongoDB using your existing connection string from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected for seeding'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Sample educational content
const educationalData = [
  // Math - Grade 5
  {
    subject: 'Mathematics',
    grade: 5,
    topic: 'Fractions',
    content: `Fractions represent parts of a whole. A fraction has two parts: the numerator (top number) and the denominator (bottom number). 

The denominator tells us how many equal parts make up a whole, while the numerator tells us how many of those parts we're working with.

For example, in the fraction 3/4:
- The denominator is 4, which means the whole is divided into 4 equal parts
- The numerator is 3, which means we're talking about 3 of those parts

Fractions can be proper (numerator smaller than denominator, like 3/4) or improper (numerator equal to or larger than denominator, like 5/4).`,
    keywords: ['fractions', 'numerator', 'denominator', 'proper fraction', 'improper fraction', 'math', 'division'],
    examples: [
      '1/2 means one half of something',
      '3/4 means three quarters of something',
      '5/4 means five quarters, which is more than one whole'
    ],
    questions: [
      {
        question: 'What is the difference between a proper and improper fraction?',
        answer: 'A proper fraction has a numerator smaller than its denominator (like 3/4), meaning it represents less than one whole. An improper fraction has a numerator equal to or larger than its denominator (like 5/4), meaning it represents one whole or more.'
      },
      {
        question: 'How do you add fractions with the same denominator?',
        answer: 'To add fractions with the same denominator, simply add the numerators and keep the same denominator. For example: 1/4 + 2/4 = 3/4'
      },
      {
        question: 'What does the denominator represent?',
        answer: 'The denominator is the bottom number in a fraction. It represents how many equal parts make up one whole.'
      }
    ],
    relatedTopics: ['Decimal Numbers', 'Percentages', 'Fraction Operations']
  },
  
  // Science - Grade 5
  {
    subject: 'Science',
    grade: 5,
    topic: 'Water Cycle',
    content: `The water cycle, also known as the hydrologic cycle, describes how water moves continuously on Earth. Water changes between liquid, vapor, and ice at different stages of the cycle.

The main stages of the water cycle are:

1. Evaporation: When the sun heats water in oceans, lakes, and rivers, it turns into water vapor and rises into the air.

2. Condensation: As water vapor rises higher in the atmosphere, it cools and forms clouds.

3. Precipitation: When water droplets in clouds become heavy enough, they fall back to Earth as rain, snow, sleet, or hail.

4. Collection: Precipitation is collected in oceans, lakes, rivers, and soil. Some water seeps deep into the ground as groundwater.

This cycle continuously repeats, recycling Earth's water supply over and over again.`,
    keywords: ['water cycle', 'evaporation', 'condensation', 'precipitation', 'collection', 'hydrologic cycle', 'science'],
    examples: [
      'Morning dew on grass is condensation',
      'Rain and snow are forms of precipitation',
      'Water evaporating from a hot sidewalk after rain'
    ],
    questions: [
      {
        question: 'What causes water to evaporate?',
        answer: 'Heat energy from the sun causes water to change from a liquid to a vapor during evaporation.'
      },
      {
        question: 'How are clouds formed?',
        answer: 'Clouds form during condensation, when water vapor in the air cools and changes into tiny water droplets or ice crystals.'
      },
      {
        question: 'Why is the water cycle important?',
        answer: 'The water cycle is important because it recycles Earth\'s water supply, provides fresh water for living things, and helps regulate Earth\'s temperature.'
      }
    ],
    relatedTopics: ['Weather', 'Clouds', 'States of Matter', 'Conservation of Water']
  },
  
  // English - Grade 5
  {
    subject: 'English',
    grade: 5,
    topic: 'Parts of Speech',
    content: `Parts of speech are categories of words based on their function in a sentence. The eight main parts of speech in English are:

1. Nouns: Name people, places, things, or ideas (e.g., teacher, school, book, happiness)
2. Pronouns: Replace nouns (e.g., I, you, he, she, it, they, we)
3. Verbs: Show action or state of being (e.g., run, jump, is, are, was)
4. Adjectives: Describe nouns or pronouns (e.g., happy, tall, blue, five)
5. Adverbs: Describe verbs, adjectives, or other adverbs (e.g., quickly, very, extremely)
6. Prepositions: Show relationships between words (e.g., in, on, under, between)
7. Conjunctions: Connect words or groups of words (e.g., and, but, or, because)
8. Interjections: Express emotion (e.g., wow!, ouch!, hooray!)

Understanding parts of speech helps us form correct sentences and improve our writing and speaking skills.`,
    keywords: ['grammar', 'parts of speech', 'nouns', 'verbs', 'adjectives', 'adverbs', 'prepositions', 'conjunctions', 'pronouns', 'interjections', 'english'],
    examples: [
      'The happy (adjective) dog (noun) ran (verb) quickly (adverb)',
      'She (pronoun) gave the book to him (pronoun)',
      'The cat jumped over (preposition) the fence'
    ],
    questions: [
      {
        question: 'What is the difference between a noun and a pronoun?',
        answer: 'A noun names a specific person, place, thing, or idea. A pronoun replaces a noun to avoid repetition. For example, instead of saying "Mary went to Mary\'s house," we say "Mary went to her house," where "her" is the pronoun.'
      },
      {
        question: 'How can I identify an adjective in a sentence?',
        answer: 'Adjectives describe nouns or pronouns and usually answer questions like "What kind?" "Which one?" "How many?" or "How much?" They often come before nouns or after linking verbs. Examples: "The red ball" (red is the adjective) or "The ball is red" (red is still the adjective).'
      },
      {
        question: 'What does a conjunction do?',
        answer: 'A conjunction connects words, phrases, or clauses in a sentence. Common conjunctions include "and," "but," "or," and "because." Example: "I like cats and dogs." Here, "and" connects the two nouns.'
      }
    ],
    relatedTopics: ['Sentence Structure', 'Grammar Rules', 'Punctuation', 'Writing Techniques']
  },
  
  // Mathematics - Grade 7
  {
    subject: 'Mathematics',
    grade: 7,
    topic: 'Quadratic Equations',
    content: `A quadratic equation is a second-degree polynomial equation of the form ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0.

There are several methods to solve quadratic equations:

1. Factoring: If the equation can be written as (px + q)(rx + s) = 0, then the solutions are x = -q/p and x = -s/r.

2. Quadratic Formula: For any quadratic equation ax² + bx + c = 0, the solutions are:
   x = (-b ± √(b² - 4ac)) / 2a

3. Completing the Square: Rearranging the equation to get (x + d)² = e, which can be solved as x = -d ± √e.

The value b² - 4ac is called the discriminant and tells us about the nature of the solutions:
- If b² - 4ac > 0, there are two real solutions
- If b² - 4ac = 0, there is one real solution (a repeated root)
- If b² - 4ac < 0, there are two complex solutions

Quadratic equations have many applications in physics, engineering, and other fields where we need to model situations involving acceleration or area.`,
    keywords: ['quadratic equation', 'polynomial', 'factoring', 'quadratic formula', 'completing the square', 'discriminant', 'algebra', 'mathematics'],
    examples: [
      'x² - 5x + 6 = 0 can be factored as (x - 2)(x - 3) = 0, so x = 2 or x = 3',
      'x² + 2x + 1 = 0 has a discriminant of 0, so there\'s only one solution: x = -1',
      'The height of a ball thrown upward is h = -4.9t² + 20t + 1.5, where t is time in seconds'
    ],
    questions: [
      {
        question: 'How do I solve x² - 7x + 12 = 0?',
        answer: 'This equation can be solved by factoring. We need to find two numbers that multiply to give 12 and add to give -7. Those numbers are -3 and -4. So, x² - 7x + 12 = (x - 3)(x - 4) = 0, which means x = 3 or x = 4.'
      },
      {
        question: 'When would I use the quadratic formula instead of factoring?',
        answer: 'Use the quadratic formula when the equation cannot be easily factored. This often happens when the solutions are not nice, whole numbers or when the discriminant (b² - 4ac) is negative, indicating complex solutions.'
      },
      {
        question: 'What is the discriminant and why is it important?',
        answer: 'The discriminant is the expression b² - 4ac in a quadratic equation ax² + bx + c = 0. It tells us about the nature of the solutions: if positive, there are two real solutions; if zero, there is one real solution (repeated); if negative, there are two complex solutions.'
      }
    ],
    relatedTopics: ['Polynomials', 'Factoring', 'Complex Numbers', 'Graphing Parabolas']
  },
  
  // Science - Grade 8
  {
    subject: 'Science',
    grade: 8,
    topic: 'Photosynthesis',
    content: `Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose (sugar).

The basic equation for photosynthesis is:
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

This process occurs primarily in the chloroplasts of plant cells, specifically in the chlorophyll-containing structures called thylakoids. Chlorophyll is the green pigment that captures light energy.

Photosynthesis happens in two main stages:
1. Light-dependent reactions: Occur in the thylakoid membrane and convert light energy into ATP and NADPH.
2. Light-independent reactions (Calvin Cycle): Use the ATP and NADPH from the first stage to convert CO₂ into glucose.

Factors affecting the rate of photosynthesis include light intensity, carbon dioxide concentration, temperature, and water availability.

Photosynthesis is vital for life on Earth because it:
- Produces oxygen for respiration
- Converts inorganic carbon (CO₂) into organic compounds
- Forms the base of nearly all food chains
- Reduces atmospheric carbon dioxide`,
    keywords: ['photosynthesis', 'chlorophyll', 'chloroplasts', 'light energy', 'chemical energy', 'glucose', 'carbon dioxide', 'oxygen', 'calvin cycle', 'biology'],
    examples: [
      'Leaves appear green because chlorophyll reflects green light while absorbing red and blue light',
      'During a sunny day, you can sometimes see oxygen bubbles rising from underwater plants',
      'Plants in a dark room will eventually die because they cannot perform photosynthesis'
    ],
    questions: [
      {
        question: 'Why do plants need sunlight?',
        answer: 'Plants need sunlight because it provides the energy required for photosynthesis. During photosynthesis, plants convert light energy into chemical energy (glucose), which they use for growth and cellular processes. Without sunlight, plants cannot produce their own food and will eventually die.'
      },
      {
        question: 'What is the role of chlorophyll in photosynthesis?',
        answer: 'Chlorophyll is the green pigment in plants that captures light energy from the sun. It absorbs primarily blue and red wavelengths of light while reflecting green wavelengths (which is why plants appear green). This captured light energy is then used to power the chemical reactions of photosynthesis.'
      },
      {
        question: 'How does photosynthesis help the environment?',
        answer: 'Photosynthesis helps the environment in several ways: it removes carbon dioxide (a greenhouse gas) from the atmosphere, produces oxygen needed by most living organisms for respiration, provides food energy for nearly all ecosystems, and creates organic matter that forms the basis of soil. This process is essential for maintaining Earth\'s atmosphere and supporting life.'
      }
    ],
    relatedTopics: ['Cellular Respiration', 'Plant Anatomy', 'Carbon Cycle', 'Chloroplasts']
  },
  
  // History - Grade 6
  {
    subject: 'History',
    grade: 6,
    topic: 'Ancient Civilizations',
    content: `Ancient civilizations were complex societies that developed before the Middle Ages. Some of the most influential ancient civilizations include:

1. Mesopotamia (3500-500 BCE): Located between the Tigris and Euphrates rivers in modern-day Iraq. Known for inventing writing (cuneiform), the wheel, and establishing early legal codes like the Code of Hammurabi.

2. Ancient Egypt (3100-30 BCE): Centered around the Nile River. Famous for pyramids, hieroglyphics, advances in mathematics, astronomy, and medicine. Ruled by pharaohs who were considered divine.

3. Ancient India (3300-1300 BCE): The Indus Valley Civilization featured advanced urban planning, sophisticated sewage systems, and standardized weights and measures. Later developments included Hinduism, Buddhism, and major mathematical innovations.

4. Ancient China (1600 BCE-220 CE): Developed along the Yellow River. Contributions include paper, printing, the compass, and gunpowder. Unified under various dynasties with a strong centralized government and civil service system.

5. Ancient Greece (800-146 BCE): Not a unified empire but a collection of independent city-states. Made significant advances in philosophy, democracy, literature, art, architecture, mathematics, and science.

6. Roman Empire (753 BCE-476 CE): Began as a small town in Italy and grew to control vast territories around the Mediterranean. Known for engineering feats, a complex legal system, military prowess, and spreading Greek cultural influences.

These civilizations laid the foundations for many aspects of modern society, including government systems, scientific thinking, architectural techniques, and cultural practices.`,
    keywords: ['ancient civilizations', 'mesopotamia', 'egypt', 'india', 'china', 'greece', 'rome', 'history', 'archaeology'],
    examples: [
      'The Great Pyramid of Giza was built during Ancient Egypt\'s Old Kingdom period',
      'Democracy was first practiced in Athens, Ancient Greece',
      'The Great Wall of China was started during the Qin Dynasty'
    ],
    questions: [
      {
        question: 'What was the significance of the Nile River to Ancient Egypt?',
        answer: 'The Nile River was essential to Ancient Egyptian civilization. It provided fertile soil through annual flooding, creating ideal farming conditions in an otherwise desert region. It served as a major transportation route for people and goods. The predictable flooding cycle also influenced Egyptian religion and calendar system. The Nile essentially made civilization possible in a harsh environment and shaped many aspects of Egyptian culture.'
      },
      {
        question: 'How did Ancient Mesopotamia contribute to writing systems?',
        answer: 'Ancient Mesopotamia developed the earliest known writing system called cuneiform around 3200 BCE. They initially used pictographs (simple pictures) carved into clay tablets, which evolved into more abstract wedge-shaped marks made with a reed stylus. This writing system was primarily used for administrative record-keeping, but eventually expanded to record laws, literature, and scientific knowledge. Cuneiform influenced later writing systems and represented a crucial step in human communication and knowledge preservation.'
      },
      {
        question: 'What was daily life like for children in Ancient Rome?',
        answer: 'Daily life for children in Ancient Rome varied greatly based on social class. Children from wealthy families received formal education from tutors or schools, learning reading, writing, math, and rhetoric. Boys from elite families prepared for political and military careers, while girls learned household management. Children from poorer families typically worked alongside their parents, learning trades or helping with farming. Roman children played with toys like dolls, hoops, and dice. Most children wore a special protective amulet called a bulla until they reached adulthood.'
      }
    ],
    relatedTopics: ['Archaeology', 'Early Writing Systems', 'Ancient Religions', 'Early Architecture', 'Trade Routes']
  },
  
  // Add more subjects for Grade 9-10
  {
    subject: 'Biology',
    grade: 9,
    topic: 'Cell Structure and Function',
    content: `Cells are the basic structural and functional units of all living organisms. There are two main types of cells: prokaryotic (like bacteria) and eukaryotic (like plant and animal cells).

Eukaryotic cells contain various organelles, each with specific functions:

1. Cell Membrane: Controls what enters and leaves the cell; provides protection and support.

2. Nucleus: Contains DNA (genetic material); controls cell activities and reproduction.

3. Cytoplasm: Gel-like substance where organelles are suspended and most cellular reactions occur.

4. Mitochondria: "Powerhouses" of the cell that produce energy through cellular respiration.

5. Endoplasmic Reticulum (ER): Network of membranes involved in protein and lipid synthesis. Rough ER has ribosomes attached; smooth ER does not.

6. Golgi Apparatus: Modifies, packages, and distributes proteins and lipids.

7. Lysosomes: Contain digestive enzymes that break down waste materials and cellular debris.

8. Ribosomes: Site of protein synthesis; can be free in cytoplasm or attached to rough ER.

9. Vacuoles: Storage compartments for water, nutrients, waste, and other materials.

Plant cells additionally have:
- Cell Wall: Rigid outer layer that provides structure and protection
- Chloroplasts: Contain chlorophyll for photosynthesis
- Large Central Vacuole: Maintains turgor pressure and stores compounds

Cell size is limited by the surface area-to-volume ratio, as a cell must have sufficient surface area to supply nutrients to its entire volume.`,
    keywords: ['cells', 'organelles', 'prokaryotic', 'eukaryotic', 'nucleus', 'mitochondria', 'cell membrane', 'biology'],
    examples: [
      'Red blood cells are specialized to carry oxygen and lack a nucleus',
      'Nerve cells have long extensions to transmit signals across distances',
      'Plant cells can convert sunlight to energy using chloroplasts'
    ],
    questions: [
      {
        question: 'What is the difference between prokaryotic and eukaryotic cells?',
        answer: 'Prokaryotic cells are simpler and smaller than eukaryotic cells. The main difference is that prokaryotic cells lack membrane-bound organelles, including a nucleus. Their genetic material (DNA) floats freely in the cytoplasm. Examples include bacteria and archaea. Eukaryotic cells have a true nucleus containing their DNA and various specialized membrane-bound organelles. Examples include plant, animal, fungal, and protist cells.'
      },
      {
        question: 'Why are mitochondria called the "powerhouses" of the cell?',
        answer: 'Mitochondria are called the "powerhouses" of the cell because they generate most of the cell\'s supply of ATP (adenosine triphosphate), which is the main energy currency of cells. They produce ATP through the process of cellular respiration, which converts nutrients (glucose) and oxygen into energy. Cells that require more energy, like muscle cells, contain more mitochondria than less active cells.'
      },
      {
        question: 'How do plant and animal cells differ?',
        answer: 'Plant cells differ from animal cells in several key ways: 1) Plant cells have a rigid cell wall made of cellulose surrounding their cell membrane, while animal cells only have a cell membrane. 2) Plant cells contain chloroplasts for photosynthesis, which animal cells lack. 3) Plant cells typically have a large central vacuole that maintains turgor pressure, while animal cells may have multiple small vacuoles. 4) Plant cells generally have a more regular, rectangular shape due to their cell wall, while animal cells have more varied shapes.'
      }
    ],
    relatedTopics: ['Cell Division', 'Cellular Transport', 'Organelle Functions', 'Cellular Metabolism']
  },
  
  {
    subject: 'Chemistry',
    grade: 10,
    topic: 'Periodic Table and Elements',
    content: `The periodic table is a systematic arrangement of chemical elements, organized based on their atomic number (number of protons), electron configurations, and recurring chemical properties.

Key features of the periodic table:

1. Elements are arranged in order of increasing atomic number (from left to right, top to bottom).

2. The table is organized into periods (horizontal rows) and groups (vertical columns).
   - There are 7 periods and 18 groups in the standard table.
   - Elements in the same group have similar chemical properties due to their similar electron configurations.

3. The table is divided into several blocks:
   - s-block: Groups 1-2 (alkali and alkaline earth metals)
   - p-block: Groups 13-18 (including nonmetals and halogens)
   - d-block: Groups 3-12 (transition metals)
   - f-block: Lanthanides and actinides (often shown separately below the main table)

4. Elements are categorized as:
   - Metals (left and middle of table): Good conductors of heat and electricity, malleable, ductile, and typically shiny
   - Nonmetals (upper right): Poor conductors, typically gases or brittle solids
   - Metalloids (diagonal line between metals and nonmetals): Have properties of both metals and nonmetals

5. Periodic trends across the table include:
   - Atomic radius: Decreases across a period, increases down a group
   - Ionization energy: Increases across a period, decreases down a group
   - Electronegativity: Increases across a period, decreases down a group
   - Reactivity: For metals, increases down a group; for nonmetals, increases up a group

The periodic table helps predict chemical behavior and is one of the most important tools in chemistry.`,
    keywords: ['periodic table', 'elements', 'atomic number', 'periods', 'groups', 'metals', 'nonmetals', 'metalloids', 'periodic trends', 'chemistry'],
    examples: [
      'Sodium (Na) is highly reactive because it has one valence electron it easily gives away',
      'Noble gases like helium and neon are unreactive because they have full valence shells',
      'Carbon forms four bonds because it has four valence electrons to share'
    ],
    questions: [
      {
        question: 'Why do elements in the same group have similar chemical properties?',
        answer: 'Elements in the same group (vertical column) of the periodic table have similar chemical properties because they have the same number of valence electrons (electrons in their outermost shell). Since chemical reactions involve the loss, gain, or sharing of valence electrons, elements with the same number of valence electrons tend to react in similar ways. For example, all Group 1 elements (alkali metals) have one valence electron, making them highly reactive and prone to losing that electron to form +1 ions.'
      },
      {
        question: 'What is the difference between metals and nonmetals?',
        answer: 'Metals and nonmetals differ in several key properties. Metals are typically shiny, good conductors of heat and electricity, malleable (can be hammered into sheets), ductile (can be drawn into wires), and generally solid at room temperature (except mercury). They tend to lose electrons in chemical reactions. Nonmetals, on the other hand, are usually poor conductors, brittle in solid form, often exist as gases or brittle solids at room temperature, and tend to gain or share electrons in reactions. Metals are found on the left and middle of the periodic table, while nonmetals occupy the upper right section.'
      },
      {
        question: 'How does atomic size change across the periodic table?',
        answer: 'Atomic size (atomic radius) follows clear trends across the periodic table. Moving left to right across a period (row), atomic radius generally decreases. This happens because each element has one more proton and electron than the previous element, but the electrons are added to the same energy level. The increased nuclear charge pulls all electrons closer to the nucleus, shrinking the atom. Moving down a group (column), atomic radius increases because electrons occupy new, higher energy levels that are farther from the nucleus, making the atom larger despite the increased nuclear charge.'
      }
    ],
    relatedTopics: ['Atomic Structure', 'Chemical Bonding', 'Electron Configuration', 'Reactivity Patterns']
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await EducationalContent.deleteMany({});
    console.log('Cleared existing educational content data');
    
    // Insert new data
    const result = await EducationalContent.insertMany(educationalData);
    console.log(`Successfully inserted ${result.length} educational content documents`);
    
    // Create indexes for faster searches
    await EducationalContent.createIndexes();
    console.log('Created indexes for faster queries');
    
    // Done
    console.log('Database seeding completed successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();