const tabs = document.querySelectorAll('.learning-tab');
const panels = {
    'what-ai': document.getElementById('what-ai'),
    'types-ai': document.getElementById('types-ai'),
    'applications-ai': document.getElementById('applications-ai'),
    'daily-ai': document.getElementById('daily-ai'),
    'benefits-ai': document.getElementById('benefits-ai'),
    'challenges-ai': document.getElementById('challenges-ai')
};
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.tab;
        Object.values(panels).forEach(p => p.classList.remove('active'));
        if (panels[target])
            panels[target].classList.add('active');
    });
});
const modalData = {
    'what-ai-core': {
        icon: '🧠',
        title: 'What is Artificial Intelligence?',
        description: 'Artificial Intelligence enables machines to perform tasks that normally require human intelligence.',
        overview: 'AI systems use algorithms, data, and computational techniques to discover patterns and make decisions. Machine Learning, Natural Language Processing, Computer Vision, and Robotics are key subfields. AI is already used in healthcare, education, transportation, finance, manufacturing, entertainment, and many other industries. Unlike traditional programs that follow fixed instructions, AI systems can learn from data and improve their performance over time.',
        technologies: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Robotics', 'Deep Learning'],
        learning: 'You will learn how AI systems process information, identify patterns, and make predictions. Understand the difference between traditional programming and machine learning approaches.'
    },
    'what-ai-how': {
        icon: '⚙️',
        title: 'How AI Works',
        description: 'AI transforms data into intelligent results through a structured process.',
        overview: 'The AI process begins with collecting data — text, images, numbers, or user behaviour. Algorithms then analyse this data to identify patterns. Based on these patterns, the AI system can produce predictions, recommendations, or decisions. For example, an image recognition system learns from labelled images before identifying similar objects in new images. This learning process allows AI to improve its performance when provided with more relevant information.',
        technologies: ['Data Collection', 'Algorithm Design', 'Pattern Recognition', 'Prediction', 'Decision Making'],
        learning: 'Understand the end-to-end AI workflow: from data collection and preprocessing to model training and deployment. Learn how AI systems learn from data and improve over time.'
    },
    'types-narrow': {
        icon: '💻',
        title: 'Narrow AI (Weak AI)',
        description: 'Narrow AI is designed to perform a specific task or a limited group of related tasks.',
        overview: 'Narrow AI, also known as Weak AI, operates within a specific domain and does not possess general human-like intelligence. Most AI systems used today belong to this category. They may perform a particular task very effectively but cannot automatically apply that ability to unrelated problems. Examples include recommendation systems, virtual assistants, image recognition, spam filters, and customer-service chatbots.',
        technologies: ['Supervised Learning', 'Classification', 'Recommendation Systems', 'NLP', 'Computer Vision'],
        learning: 'Explore how Narrow AI is built and deployed in real-world applications. Understand the difference between task-specific AI and general intelligence.'
    },
    'types-general': {
        icon: '🧑‍💻',
        title: 'General AI (AGI)',
        description: 'Theoretical AI capable of understanding, learning and performing a wide range of intellectual tasks.',
        overview: 'Artificial General Intelligence (AGI) refers to a theoretical AI system that would possess broad human-like intelligence. It would be able to understand, learn, and apply knowledge across different domains, adapt to unfamiliar problems, and transfer learning from one situation to another. AGI has not yet been achieved and remains an active area of research and speculation.',
        technologies: ['Cognitive Science', 'Neuroscience', 'Advanced Machine Learning', 'Reasoning', 'Adaptation'],
        learning: 'Learn about the challenges and possibilities of creating human-level artificial intelligence. Understand the research approaches being explored to achieve AGI.'
    },
    'types-super': {
        icon: '⭐',
        title: 'Super AI (ASI)',
        description: 'Hypothetical AI that would exceed human intellectual capabilities in many areas.',
        overview: 'Artificial Super Intelligence (ASI) refers to a hypothetical form of AI that would surpass the best human minds in every field — including scientific reasoning, creativity, social skills, and problem-solving. ASI is mainly discussed in relation to possible future developments and the long-term impact of Artificial Intelligence. It does not currently exist and remains a speculative concept.',
        technologies: ['Advanced AI', 'Future Technologies', 'Ethics', 'Safety Research'],
        learning: 'Explore the theoretical implications and ethical considerations of advanced AI systems. Understand the potential benefits and risks of superintelligent AI.'
    },
    'app-navigation': {
        icon: '🗺️',
        title: 'Intelligent Navigation',
        description: 'AI-powered navigation systems predict traffic and recommend optimal routes.',
        overview: 'Modern navigation applications use machine learning techniques combined with real-time traffic information, historical data, and user inputs to estimate travel conditions and recommend suitable routes. The system continuously learns from new data to improve its predictions, helping users respond to changing road conditions more efficiently. This technology saves time, reduces fuel consumption, and improves overall travel experience.',
        technologies: ['Machine Learning', 'Real-time Data', 'Prediction Algorithms', 'GPS', 'Traffic Analysis'],
        learning: 'Learn how AI processes geographical and traffic data to make intelligent routing decisions. Understand the role of real-time data in AI systems.'
    },
    'app-recommendation': {
        icon: '🎬',
        title: 'Streaming Recommendations',
        description: 'AI analyses what you watch to recommend content you might enjoy.',
        overview: 'Streaming platforms use recommendation systems that analyse user behaviour — what they watch, search for, and interact with. By comparing these patterns with other users, the AI identifies content that may match individual interests. This personalised approach improves user engagement and helps users discover new content they might otherwise miss.',
        technologies: ['Collaborative Filtering', 'Content-based Filtering', 'User Behaviour Analysis', 'Pattern Recognition'],
        learning: 'Understand how recommendation algorithms work and how they personalise content for each user. Explore the balance between exploration and exploitation in recommendations.'
    },
    'app-translation': {
        icon: '🌐',
        title: 'Machine Translation',
        description: 'AI translates between languages while considering context and meaning.',
        overview: 'AI-based translation systems analyse language patterns, grammar, and context to translate sentences between different languages. Modern systems use neural machine translation, which can consider entire sentences rather than translating word-by-word. This approach produces more natural and accurate translations, capturing nuances and idiomatic expressions.',
        technologies: ['Neural Machine Translation', 'Natural Language Processing', 'Transformer Models', 'Context Analysis'],
        learning: 'Explore how AI understands and generates human language. Learn about the techniques used to achieve accurate and natural-sounding translations.'
    },
    'app-medical': {
        icon: '🏥',
        title: 'AI-Assisted Medical Imaging',
        description: 'AI analyses X-rays, CT scans, and other medical images to assist healthcare professionals.',
        overview: 'AI systems can analyse patterns in medical images to assist healthcare professionals in reviewing large amounts of visual data. These systems can help identify potential abnormalities, highlight areas of concern, and support clinical decision-making. While not replacing doctors, AI serves as a powerful tool that can increase efficiency and accuracy in medical imaging.',
        technologies: ['Computer Vision', 'Deep Learning', 'Image Analysis', 'Pattern Recognition', 'Healthcare'],
        learning: 'Learn how AI is transforming medical diagnosis and treatment. Understand the ethical and practical considerations of AI in healthcare.'
    },
    'app-finance': {
        icon: '💰',
        title: 'Fraud Detection',
        description: 'AI analyses transaction patterns to identify potentially fraudulent activities.',
        overview: 'Financial organisations use machine learning to analyse transaction patterns in real-time. By understanding normal behaviour, the system can identify unusual activities that may require additional investigation. This helps prevent fraudulent transactions, protect customers, and reduce financial losses.',
        technologies: ['Anomaly Detection', 'Pattern Recognition', 'Real-time Analysis', 'Machine Learning', 'Security'],
        learning: 'Understand how AI detects fraudulent activities and protects financial systems. Explore the techniques used for real-time anomaly detection.'
    },
    'app-face': {
        icon: '👤',
        title: 'Face Recognition',
        description: 'AI analyses facial characteristics for user authentication and identification.',
        overview: 'Some smartphones and security systems use AI-based computer vision to analyse facial characteristics. The system creates a unique template based on facial features and uses it for user authentication. This technology provides a convenient and secure way to access devices and services.',
        technologies: ['Computer Vision', 'Facial Recognition', 'Biometrics', 'Authentication', 'Security'],
        learning: 'Explore how AI recognises and identifies human faces. Understand the technology behind facial authentication and its applications.'
    },
    'app-smarthome': {
        icon: '🏠',
        title: 'Smart Home Automation',
        description: 'AI controls lighting, temperature, and security based on user habits and preferences.',
        overview: 'Smart home systems use AI to learn user behaviour patterns and automatically adjust settings for comfort, convenience, and energy efficiency. AI-powered thermostats learn when you are home and adjust temperature accordingly. Smart lighting systems adjust brightness based on time of day and occupancy. Security systems can differentiate between residents, visitors, and potential intruders.',
        technologies: ['Internet of Things', 'Machine Learning', 'Sensor Data', 'Automation', 'Energy Efficiency'],
        learning: 'Explore how AI creates intelligent living spaces. Learn about the integration of AI with IoT devices for home automation.'
    },
    'app-autonomous': {
        icon: '🚗',
        title: 'Autonomous Vehicles',
        description: 'Self-driving cars use AI for perception, decision-making, and navigation.',
        overview: 'Autonomous vehicles combine multiple AI technologies — computer vision for perceiving the environment, sensor fusion for integrating data from cameras, LiDAR, and radar, and deep learning for decision-making. The AI system must understand traffic rules, predict behaviour of other road users, and make safe driving decisions in real-time. This technology promises to revolutionise transportation by improving safety and accessibility.',
        technologies: ['Computer Vision', 'Deep Learning', 'Sensor Fusion', 'LiDAR', 'Decision Making'],
        learning: 'Understand how AI enables self-driving technology. Explore the perception, planning, and control systems that power autonomous vehicles.'
    },
    'daily-phone': {
        icon: '📱',
        title: 'AI in Smartphones',
        description: 'Smartphones use AI for facial recognition, voice assistance, photo processing, and predictive typing.',
        overview: 'Modern smartphones integrate AI in many features that users interact with daily. Facial recognition uses computer vision to authenticate users. Voice assistants like Siri and Google Assistant use NLP to understand and respond to commands. Camera apps use AI to enhance photos, recognise scenes, and optimise settings automatically. Predictive typing learns from your writing style to suggest words and phrases.',
        technologies: ['Facial Recognition', 'Natural Language Processing', 'Computer Vision', 'Predictive Algorithms'],
        learning: 'Understand how AI enhances the smartphone experience and enables new features. Learn about the AI technologies powering everyday mobile interactions.'
    },
    'daily-maps': {
        icon: '🗺️',
        title: 'AI in Navigation',
        description: 'Navigation apps use AI to provide traffic analysis, route suggestions, and journey time estimation.',
        overview: 'AI-powered navigation systems process vast amounts of data — including real-time traffic information, road conditions, and user preferences — to provide accurate journey planning. The system learns from historical data and adapts to changing conditions, offering alternative routes when delays are detected.',
        technologies: ['Traffic Prediction', 'Route Optimization', 'Real-time Data', 'Machine Learning'],
        learning: 'Learn how AI processes geospatial data to provide intelligent navigation assistance. Understand the role of machine learning in traffic prediction.'
    },
    'daily-streaming': {
        icon: '🎵',
        title: 'AI in Entertainment',
        description: 'Streaming platforms use AI to recommend music, movies, and videos based on your preferences.',
        overview: 'AI recommendation systems analyse your viewing and listening history to understand your preferences. By comparing your behaviour with other users, the system can suggest content you are likely to enjoy. This personalisation improves user satisfaction and helps platforms retain subscribers.',
        technologies: ['Recommendation Systems', 'User Behaviour Analysis', 'Collaborative Filtering', 'Content Analysis'],
        learning: 'Understand how AI personalises your entertainment experience and helps you discover new content.'
    },
    'daily-search': {
        icon: '🔍',
        title: 'AI in Search Engines',
        description: 'Search engines use AI to understand queries and rank information for relevant results.',
        overview: 'AI-powered search engines analyse your query to understand the intent behind your search. They then rank results based on relevance, quality, and authority. Modern search systems use NLP to interpret natural language queries and provide more accurate results.',
        technologies: ['Natural Language Processing', 'Information Retrieval', 'Ranking Algorithms', 'Query Understanding'],
        learning: 'Explore how AI powers search engines and helps you find the information you need quickly and accurately.'
    },
    'daily-chatbot': {
        icon: '💬',
        title: 'AI in Virtual Assistants & Chatbots',
        description: 'AI uses natural language processing for text and voice interactions.',
        overview: 'Virtual assistants like Siri, Alexa, and Google Assistant use AI to understand voice commands and respond appropriately. Chatbots use similar technology to provide customer support and answer questions. These systems rely on NLP to interpret human language and generate natural-sounding responses.',
        technologies: ['Natural Language Processing', 'Speech Recognition', 'Intent Classification', 'Dialogue Management'],
        learning: 'Understand how AI understands and responds to human language. Learn about the technology behind virtual assistants and chatbots.'
    },
    'daily-email': {
        icon: '✉️',
        title: 'AI in Email Filtering',
        description: 'AI automatically classifies and filters unwanted or suspicious emails.',
        overview: 'Email services use AI to analyse message content, sender information, and other characteristics to identify spam and phishing attempts. The system learns from user feedback and continuously improves its filtering accuracy, protecting users from unwanted and potentially harmful messages.',
        technologies: ['Text Classification', 'Spam Detection', 'Pattern Recognition', 'Machine Learning'],
        learning: 'Learn how AI protects your inbox from spam and phishing attempts. Understand the classification techniques used for email filtering.'
    },
    'daily-social': {
        icon: '📱',
        title: 'AI in Social Media',
        description: 'AI curates feeds, suggests content, detects harmful posts, and personalises ads.',
        overview: 'Social media platforms use AI extensively — algorithms curate your feed by ranking posts based on predicted engagement. AI suggests content, friends, and groups you might like. Content moderation systems detect and remove harmful content. Ad targeting uses AI to show relevant advertisements based on user behaviour and interests.',
        technologies: ['Recommendation Algorithms', 'Content Moderation', 'Ad Targeting', 'Sentiment Analysis', 'User Engagement'],
        learning: 'Explore how AI shapes your social media experience. Understand the algorithms that determine what you see and how platforms moderate content.'
    },
    'daily-ecommerce': {
        icon: '🛒',
        title: 'AI in E-commerce Shopping',
        description: 'AI powers personalised product recommendations and visual search.',
        overview: 'E-commerce platforms use AI to enhance the shopping experience. Recommendation systems suggest products based on browsing and purchase history. Visual search allows users to upload images to find similar products. AI-powered chatbots provide customer support. Dynamic pricing adjusts prices based on demand and competition.',
        technologies: ['Recommendation Systems', 'Visual Search', 'Chatbots', 'Dynamic Pricing', 'User Behaviour Analysis'],
        learning: 'Learn how AI transforms online shopping. Understand the technologies that power personalised recommendations and visual search.'
    },
    'benefit-automation': {
        icon: '⚡',
        title: 'Automation',
        description: 'AI automates repetitive tasks, allowing people to focus on creativity and human judgement.',
        overview: 'AI can automate time-consuming and repetitive tasks across various industries — from data entry and processing to customer service and manufacturing. By handling routine work, AI frees up human workers to focus on activities that require creativity, critical thinking, and human interaction. This leads to increased productivity and job satisfaction.',
        technologies: ['Robotic Process Automation', 'Workflow Automation', 'Task Optimization', 'Productivity'],
        learning: 'Understand how AI automation transforms workflows and improves productivity. Explore the balance between automation and human involvement.'
    },
    'benefit-efficiency': {
        icon: '🚀',
        title: 'Increased Efficiency',
        description: 'AI processes large amounts of information quickly, completing tasks more efficiently.',
        overview: 'AI systems can process and analyse vast datasets at speeds impossible for humans. This efficiency enables faster decision-making, quicker response times, and more efficient use of resources. In fields like finance, healthcare, and logistics, AI-powered efficiency translates to cost savings and improved outcomes.',
        technologies: ['Data Processing', 'Optimization', 'Speed', 'Resource Management'],
        learning: 'Explore how AI improves efficiency across industries and enables faster, more informed decision-making.'
    },
    'benefit-analysis': {
        icon: '📊',
        title: 'Data Analysis',
        description: 'AI identifies patterns in large datasets that may be difficult to discover manually.',
        overview: 'AI can analyse massive amounts of data to uncover hidden patterns, trends, and insights. This capability helps businesses understand customer behaviour, scientists discover new relationships, and healthcare providers identify risk factors. AI-powered data analysis enables evidence-based decision-making.',
        technologies: ['Data Mining', 'Pattern Recognition', 'Predictive Analytics', 'Big Data'],
        learning: 'Learn how AI extracts insights from data and supports data-driven decision-making. Understand the techniques used for pattern discovery.'
    },
    'benefit-accuracy': {
        icon: '🎯',
        title: 'Improved Accuracy',
        description: 'When properly designed, AI provides consistent results and helps reduce repetitive human error.',
        overview: 'AI systems can achieve high levels of accuracy in well-defined tasks by eliminating human factors like fatigue, distraction, and inconsistency. In medical diagnosis, quality control, and other critical applications, AI-powered accuracy can significantly improve outcomes and reduce errors.',
        technologies: ['Precision', 'Consistency', 'Quality Control', 'Error Reduction'],
        learning: 'Understand how AI achieves high accuracy and consistency. Explore the factors that influence AI accuracy and reliability.'
    },
    'benefit-availability': {
        icon: '🕐',
        title: 'Continuous Availability',
        description: 'AI systems can provide services continuously, such as 24/7 customer support.',
        overview: 'AI-powered systems can operate around the clock without breaks, providing consistent service availability. This is particularly valuable for customer support, monitoring, and critical infrastructure. Automated systems can handle basic queries and tasks at any time, improving user experience and operational efficiency.',
        technologies: ['Automation', '24/7 Operation', 'Reliability', 'Customer Service'],
        learning: 'Explore how AI enables continuous service delivery and improves customer experience through round-the-clock availability.'
    },
    'benefit-personalisation': {
        icon: '❤️',
        title: 'Personalisation',
        description: 'AI analyses preferences to provide personalised recommendations and experiences.',
        overview: 'AI can analyse individual preferences, behaviour, and history to create personalised experiences — from product recommendations and content suggestions to adaptive learning and customised health plans. This personalisation enhances user engagement, satisfaction, and outcomes by tailoring experiences to individual needs.',
        technologies: ['Recommendation Systems', 'User Profiling', 'Behaviour Analysis', 'Customization'],
        learning: 'Understand how AI personalises user experiences and the technology behind recommendation systems. Explore the benefits and challenges of personalisation.'
    },
    'benefit-scalability': {
        icon: '📈',
        title: 'Scalability',
        description: 'AI systems can scale to handle growing amounts of work without significant additional cost.',
        overview: 'AI systems are inherently scalable — once trained, they can handle increasing workloads with minimal additional investment. Cloud-based AI services allow organisations to scale up or down based on demand. This scalability makes AI accessible to businesses of all sizes and enables rapid growth without proportional cost increases.',
        technologies: ['Cloud Computing', 'Infrastructure', 'Growth', 'Resource Management'],
        learning: 'Understand how AI systems scale to meet growing demands. Explore the infrastructure and cloud technologies that enable AI scalability.'
    },
    'benefit-innovation': {
        icon: '💡',
        title: 'Driving Innovation',
        description: 'AI enables new products, services, and research breakthroughs across industries.',
        overview: 'AI is a powerful engine for innovation. In drug discovery, AI accelerates the identification of potential treatments. In manufacturing, AI enables predictive maintenance and quality control. In entertainment, AI creates new forms of creative expression. AI-powered innovation is transforming every sector and creating new possibilities that were previously unimaginable.',
        technologies: ['Research & Development', 'Breakthroughs', 'Future', 'Innovation'],
        learning: 'Explore how AI is driving innovation across industries. Learn about breakthrough applications and the future potential of AI-powered innovation.'
    },
    'challenge-privacy': {
        icon: '🔒',
        title: 'Privacy & Data Security',
        description: 'AI systems may process large amounts of personal information, requiring strong privacy controls.',
        overview: 'AI systems often require access to large datasets, which may include sensitive personal information. This raises important privacy and security concerns. Organisations must implement robust privacy controls, data protection measures, and ethical guidelines to protect user data and maintain trust.',
        technologies: ['Data Privacy', 'Encryption', 'Security', 'Compliance', 'Ethics'],
        learning: 'Explore the privacy and security challenges of AI. Understand the principles of responsible AI development and data protection.'
    },
    'challenge-bias': {
        icon: '⚖️',
        title: 'Bias & Fairness',
        description: 'AI can produce unfair results when training data contains bias or lacks representation.',
        overview: 'AI systems learn from training data, and if that data contains bias or underrepresents certain groups, the AI may produce unfair or discriminatory outcomes. Addressing bias requires careful data collection, bias detection techniques, and ongoing monitoring to ensure fairness across different demographics.',
        technologies: ['Fairness', 'Bias Detection', 'Inclusive Data', 'Ethical AI', 'Responsible AI'],
        learning: 'Understand the sources of bias in AI systems and learn strategies to detect and mitigate bias for fairer outcomes.'
    },
    'challenge-employment': {
        icon: '💼',
        title: 'Changes to Employment',
        description: 'Automation may change responsibilities in some occupations while increasing demand for digital skills.',
        overview: 'AI and automation are transforming the job market by automating routine tasks and creating new roles. While some jobs may be displaced, new opportunities are emerging in AI development, data science, and digital skills. Lifelong learning and adaptability are becoming increasingly important in the AI-driven economy.',
        technologies: ['Automation', 'Job Transformation', 'Digital Skills', 'Reskilling', 'Future of Work'],
        learning: 'Explore the impact of AI on employment and the skills needed to thrive in an AI-augmented workforce.'
    },
    'challenge-transparency': {
        icon: '🔍',
        title: 'Transparency',
        description: 'Some AI systems are difficult to interpret, making it hard to understand why a result was produced.',
        overview: 'Complex AI models — especially deep learning systems — can act as "black boxes" where the decision-making process is not easily understood. This lack of transparency can be problematic in high-stakes applications like healthcare, finance, and criminal justice. Explainable AI (XAI) seeks to make AI systems more interpretable.',
        technologies: ['Explainable AI', 'Interpretability', 'Transparency', 'Trust', 'Accountability'],
        learning: 'Understand the importance of transparency in AI systems and learn about techniques for making AI more interpretable and trustworthy.'
    },
    'challenge-security': {
        icon: '🛡️',
        title: 'Security & Misuse',
        description: 'AI can be misused to support harmful activities or create misleading information.',
        overview: 'AI technology can be weaponised for malicious purposes — including creating deepfakes, automating disinformation, and developing autonomous weapons. Safeguards, regulations, and ethical frameworks are needed to prevent the misuse of AI and protect society from potential harm.',
        technologies: ['Security', 'Ethics', 'Misuse Prevention', 'AI Safety', 'Regulation'],
        learning: 'Explore the security risks and ethical challenges of AI. Understand the importance of AI safety and responsible development.'
    },
    'challenge-responsibility': {
        icon: '👥',
        title: 'Human Responsibility',
        description: 'Human judgement and supervision remain important, especially for significant decisions.',
        overview: 'AI should complement human decision-making, not replace it entirely. Human judgement, ethics, and accountability remain crucial — especially for decisions that significantly affect people\'s lives. Oversight, validation, and human-in-the-loop systems help ensure that AI systems are used responsibly.',
        technologies: ['Human Oversight', 'Accountability', 'Ethics', 'Decision Support', 'Governance'],
        learning: 'Understand the role of human responsibility in AI development and deployment. Learn about human-AI collaboration and ethical frameworks.'
    },
    'challenge-energy': {
        icon: '🔋',
        title: 'Energy Consumption',
        description: 'Training and running large AI models requires significant computational resources and energy.',
        overview: 'Large AI models require enormous computational power for training — generating significant carbon emissions. The environmental impact of AI is a growing concern. Researchers are developing more efficient algorithms, hardware, and training techniques to reduce energy consumption. Sustainable AI practices are becoming increasingly important.',
        technologies: ['Sustainability', 'Carbon Footprint', 'Efficient Computing', 'Green AI', 'Resource Management'],
        learning: 'Understand the environmental impact of AI and learn about sustainable AI practices. Explore techniques for reducing AI\'s carbon footprint.'
    },
    'challenge-regulation': {
        icon: '📜',
        title: 'Regulatory Compliance',
        description: 'AI development must navigate evolving laws, standards, and ethical guidelines.',
        overview: 'AI development operates in a complex regulatory environment. Laws governing data privacy, algorithmic accountability, and AI safety are rapidly evolving. Organisations must stay informed about regulations like GDPR, AI Act, and emerging standards. Compliance requires ongoing monitoring, documentation, and ethical review of AI systems.',
        technologies: ['Governance', 'Compliance', 'Law', 'Ethics', 'Standards'],
        learning: 'Explore the regulatory landscape for AI. Understand the legal and ethical frameworks that govern AI development and deployment.'
    }
};
const modal = document.getElementById('aiModal');
const modalClose = document.getElementById('modalClose');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalOverview = document.getElementById('modalOverview');
const modalTechnologies = document.getElementById('modalTechnologies');
const modalLearning = document.getElementById('modalLearning');
document.querySelectorAll('.image-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
        const key = card.dataset.modal;
        const data = modalData[key];
        if (!data)
            return;
        modalIcon.textContent = data.icon;
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalOverview.textContent = data.overview;
        modalLearning.textContent = data.learning;
        modalTechnologies.innerHTML = '';
        data.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'modal-tech';
            tag.textContent = tech;
            modalTechnologies.appendChild(tag);
        });
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
    });
});
function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal)
    closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('show'))
    closeModal(); });
const video = document.querySelector('.ai-hero-video');
if (video) {
    video.addEventListener('error', () => console.warn('Video not found.'));
}
