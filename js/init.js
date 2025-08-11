/**
 * Portfolio Content Data
 * 
 * Centralized content management for Maria Kiani's portfolio website.
 * Contains all text content, experience data, and translations.
 * 
 * Features dynamic experience calculation and multilingual support.
 * @author Maria Kiani
 */

// ===== DYNAMIC EXPERIENCE CALCULATION ===== 
// Calculates years of experience automatically based on start date
// This keeps the "X+ years experience" text always current
// Started career: December 2011 (Mellat Bank)
function calculateExperienceYears() {
    const startDate = new Date('2011-12-01'); // Career start date: Mellat Bank (Dec 2011)
    const currentDate = new Date();
    
    // Calculate years more precisely - we're in June 2025, so it should be 13.5+ years
    // But display as 14+ for professional presentation (rounded up)
    const diffTime = Math.abs(currentDate - startDate);
    const exactYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    
    // Round up to next year for professional display (13.5 -> 14, 14.2 -> 15, etc.)
    const displayYears = Math.ceil(exactYears);
    
    return displayYears;
}

// Get current experience years (will be 13, 14, 15, 16... etc as time passes)
const experienceYears = calculateExperienceYears();

// Create global content object from embedded data
window.content = {
    en: {
        nav: {
            home: "Home",
            about: "About",
            experience: "Experience", 
            projects: "Projects",
            contact: "Contact"
        },
        skipToMain: "Skip to main content",
        skipToNav: "Skip to navigation",
        hero: {
            name: "Maria Kiani",
            title: `AI Engineer | Data Scientist | ${experienceYears}+ Years Excellence`,
            subtitle: "Transforming Business Intelligence through Advanced AI Solutions",
            summary: `Accomplished AI Engineer with Master's degrees in Software Engineering and Data Science, bringing ${experienceYears}+ years of proven expertise in transforming complex data into strategic business value. Successfully mentored 2,500+ analysts while delivering innovative solutions across multiple industries. Currently pioneering AI-driven solutions in Germany's thriving tech ecosystem, combining deep technical expertise with exceptional business acumen to drive measurable results.`,
            location: "Potsdam, Germany"
        },
        about: {
            title: "About Me",
            content: `As an experienced AI Engineer and Data Scientist, I bring over ${experienceYears} years of hands-on expertise in transforming data into actionable business insights. My journey began with a strong foundation in software engineering and evolved into a dynamic career at the intersection of data science and artificial intelligence. With a Master's degree in Data Science from Germany and a specialization in AI, I have led impactful projects ranging from customer churn prediction to time-series forecasting of digital assets like XRP and Bitcoin. My work integrates modern tools such as Python, LangChain, and cloud platforms including AWS and Azure to create intelligent, scalable solutions.\n\nAs AI engineer, I have built AI-powered applications that assist user registration, generate SEO-optimized content, and extract HR KPIs from unstructured documents using LLMs. These projects reflect my core belief: that AI should simplify complexity and unlock measurable value. Whether it's developing RAG-based chatbots, customer churn prediction models, or deploying NLP pipelines on the cloud, I consistently strive to bridge technical innovation with strategic business impact.\n\nI am driven by a passion for continuous learning and a commitment to excellence. Beyond delivering solutions, I actively mentor junior data professionals and contribute to educational projects, including authoring books on COBIT 5 and Excel for Data Analysts. Currently based in Potsdam, Germany, I continue to explore new frontiers in AI, working on projects that combine predictive modeling, natural language processing, and cloud-native development. I invite you to connect with me if you're looking to harness the power of AI for your business transformation.`,
            expertise: {
                focus: "AI Engineering & Machine Learning Operations",
                specialization: "Production AI Systems & Business Intelligence",
                industries: "FinTech, E-commerce, Healthcare, Digital Marketing",
                achievements: "2,500+ professionals mentored | 48% efficiency improvements"
            }
        },
        skills: {
            title: "Technical Skills",
            categories: {
                programming: "Programming Languages",
                ai: "AI Technologies",
                ml: "Machine Learning",
                etl: "ETL Tools",
                visualization: "Data Visualization",
                analytics: "Statistical Analysis",
                cloud: "Cloud Platforms",
                tools: "Development Tools"
            },
            items: {
                programming: ["Python", "SQL", "C#"],
                ai: ["OpenAI", "Retrieval-Augmented Generation", "Langchain"],
                ml: ["Scikit-learn", "PySpark", "TensorFlow", "PyTorch", "Deep Learning"],
                etl: ["Apache Airflow", "dbt", "SSIS", "Power Query"],
                visualization: ["Power BI", "Tableau", "Matplotlib", "Seaborn"],
                analytics: ["Regression Analysis", "Hypothesis Testing", "Time Series Analysis"],
                cloud: ["Azure","Google Cloud Platform", "BigQuery", "AWS"],
                tools: ["Git", "GitHub", "Excel"]
            }
        },
        experience: {
            title: "Professional Experience",
            jobs: [
                {
                    title: "AI Engineer",
                    company: "Freelance",
                    location: "Germany (Remote/Hybrid)",
                    period: "Oct 2024 – Present",
                    type: "Freelance",
                    description: "- Working on AI-Driven Digital Marketing Solution.\n- Implemented an intelligent solution to assist registration of new users using LLMs, Python, OCR.\n- Developed an automated system to generate SEO-Optimized content using Python, Fine-tuning OpenAI, OLlama, LangChain, HTML and Javascript. \n- Developed a web application for extracting HR-related KPIs from PDFs and Images in 4 categories selected by user and store in Azure SQL to have agile insights on HR KPIs global standards using Azure AI services, Python, HTML, CSS, API programming and OpenAI.\n- Developed a Customer Churn Prediction model for B2C company using Python.\n- Developed chatbot with RAG using AWS AI Service, Python, Streamlit.\n- Finalized XRP and Bitcoin prediction project using time series deep learning models based on market analysis and sentiment analysis.",
                    link: null
                },
                {
                    title: "Career Break",
                    company: "Professional Development",
                    location: "Potsdam, Germany",
                    period: "03/2024 – 09/2024",
                    type: "Career Break",
                    description: " - Completed a project-based course focused on AI developer topics, gaining hands-on experience to deploy AI solutions. \n- Strengthened expertise in Azure AI, AWS, Deep learning through self-learning. \n- Successfully finalized master's thesis in Fraud detection subject. \n- Provided customer support for clients at previous company. \n- Enhanced German language skills.",
                    link: null
                },
                {
                    title: "Data Science/Analysis Consultant",
                    company: "Darsoon",
                    location: "Ontario, Canada (Remote)",
                    period: "01/2023 – 03/2024",
                    type: "Part-time",
                    description: "\n- Analyzed gold price news using Guardian API and Python, identified outliers in time series and researched their causes. \n- Transformed Google Analytics data with dbt, visualized BigQuery data in Tableau, demonstrating that loyal customers account for 60% of revenue. \n- Mentored junior analysts in SQL, Python, Power BI, and Excel. \n- Quickly adapted to new processes and accelerated analytics projects.",
                    link: "https://darsoon.com/en"
                },
                {
                    title: "Senior Data Analyst",
                    company: "Favagostar",
                    location: "Tehran, Iran",
                    period: "03/2019 – 01/2023",
                    type: "Full-time Hybrid",
                    description: "\n- Increased rebooking rate of a home service provider by 48% through data cleaning and A/B testing. \n- Analyzed project processes and reduced costs by 32%, built star schema data warehouse and created Power BI dashboards. \n- Defined metrics and dashboards for over 10 companies across industries including industrial adhesives, oil trading, crypto portfolios, e-commerce, hospitality, HR, and digital marketing. \n- Responsible for ad-hoc reports, trained approximately 30 company employees. \n-Received performance bonuses for three consecutive years, and won major clients through innovative ideas.",
                    link: "https://persiafava.com/"
                },
                {
                    title: "Data Science Lecturer",
                    company: "Azad University",
                    location: "Tehran, Iran",
                    period: "01/2014 – 01/2019",
                    type: "Full-time",
                    description: "Taught SQL Server, Excel, and Python programming to university students.",
                    link: "https://qods.iau.ir/fa"
                },
                {
                    title: "Data Analyst",
                    company: "Mellat Bank",
                    location: "Tehran, Iran", 
                    period: "12/2011 – 03/2014",
                    type: "Full-time",
                    description: "- Optimized IT processes for Iran's largest bank. \n- Created HR, product, and service dashboards using Power Query and Excel. \n- Defined KPIs in coordination with stakeholders. \n- Received manager recognition for outstanding project performance.",
                    link: "https://bankmellat.ir/default.aspx"
                },
                {
                    title: "Full stack developer",
                    company: "Asan Software",
                    location: "Tehran, Iran", 
                    period: "04/2010 – 11/2011",
                    type: "Full-time",
                    description: "\n - C# , WPF and LINQ Programmer for Payroll system. \n - Designed and Implemented SQL server database.",
                    link: "https://bankmellat.ir/default.aspx"
                }
            ]
        },
        education: {
            title: "Education",
            degrees: [
                {
                    degree: "Master of Science in Data Science", 
                    school: "University of Europe for Applied Sciences",
                    location: "Potsdam, Germany",
                    year: "August 2024"
                },
                {
                    degree: "Bachelor of Science in Computer Science",
                    school: "Bahounar University", 
                    location: "Kerman, Iran",
                    year: "May 2010"
                }
            ]
        },
        certifications: {
            title: "Certifications",
            items: [
                {
                    name: "Generative AI for Developers",
                    org: "Coyotiv Academy",
                    year: "2024"
                },
                {
                    name: "Statistical Thinking in Python",
                    org: "DataCamp", 
                    year: "2023"
                },
                {
                    name: "SQL Server Design",
                    org: "Faratar az Danesh Academy",
                    year: "2022"
                },
                {
                    name: "Designing BI Solutions with Microsoft SQL Server",
                    org: "Nikamooz",
                    year: "2015"
                },
                {
                    name: "SQL Server Query",
                    org: "Faratar az Danesh Academy", 
                    year: "2012"
                },
                {
                    name: "Scrum Master Certificate of Proficiency",
                    org: "Barnamenevis Academy",
                    year: "2012"
                }
            ]
        },
        projects: {
            title: "Featured Projects",
            items: [
                {
                    name: "AI-Driven digital marketing",
                    description: "Implementing an AI-Driven Digital Marketing Solution.",
                    link: "It's commercial project",
                    tech: ["LLMs","Python","Langchain"]
                },
                {
                    name: "AI registration assistant",
                    description: "Implemented an intelligent solution to assist registration of new users using LLMs, Python, OCR.",
                    link: "It's commercial project",
                    tech: ["Python","LLMs", "OCR", "WebScrap"]
                },
                {
                    name: "AI-Driven SEO-optimized solution",
                    description: "Developed an automated system to generate SEO-Optimized content using Python, Fine-tuning OpenAI, OLlama, LangChain, HTML and Javascript.",
                    link: "It's commercial project",
                    tech: ["Python","LLMs","RAG","Fine-tuning"]
                },
                {
                    name: "Energy Consumption Prediction",
                    description: "Python-based machine learning model for predicting energy consumption patterns using time series analysis and regression techniques.",
                    link: "https://github.com/Mari-kn/Energy_Consumption_Prediction_Python",
                    tech: ["Python", "Machine Learning", "Time Series"]
                },
                {
                    name: "E-Commerce Recommendation System",
                    description: "Intelligent product recommendation system that identifies similar products and enhances customer experience through collaborative filtering.",
                    link: "https://github.com/Mari-kn/Recommender_System",
                    tech: ["Python", "Collaborative Filtering", "Data Science"]
                },
                {
                    name: "Cryptocurrency Fraud Detection",
                    description: "Advanced fraud detection system for cryptocurrency transactions using machine learning algorithms and anomaly detection.",
                    link: "https://github.com/Mari-kn/Fraud_Detection_Crypto_Python",
                    tech: ["Python", "Fraud Detection", "Blockchain"]
                },
                {
                    name: "Stock Prediction with Sentiment Analysis",
                    description: "Stock price prediction model combining sentiment analysis of news data with technical indicators using Hugging Face transformers.",
                    link: "https://github.com/Mari-kn/Stock_Prediction_Sentiment_Huggingface",
                    tech: ["Python", "NLP", "Financial Analysis"]
                },
                {
                    name: "Cryptocurrency Deep Learning Prediction",
                    description: "Deep learning model for XRP and Bitcoin time series prediction combined with comprehensive market analysis.",
                    link: "https://github.com/Mari-kn/CryptoCurrency_Prediction_DeepLearning",
                    tech: ["Deep Learning", "TensorFlow", "Cryptocurrency"]
                },
                {
                    name: "Customer Churn Prediction",
                    description: "Machine learning solution for predicting customer churn in IT services using imbalanced data techniques.",
                    link: "https://github.com/Mari-kn/Customer_Churn_Prediction_Imbalenced_Data",
                    tech: ["Python", "Imbalanced Data", "Classification"]
                },
                {
                    name: "AI-Powered Customer Service",
                    description: "Automated customer service system based on OpenAI and Retrieval-Augmented Generation (RAG) for intelligent query handling.",
                    link: "https://github.com/Mari-kn/call-center-GenAI",
                    tech: ["OpenAI", "RAG", "Customer Service"]
                },
                {
                    name: "Health Chatbot with OpenAI",
                    description: "Intelligent health consultation chatbot using OpenAI and Pinecone vector database for accurate medical information retrieval.",
                    link: "https://github.com/Mari-kn/Chatbot_OpenAI/",
                    tech: ["OpenAI", "Pinecone", "Healthcare"]
                },
                {
                    name: "AI Children's Story Generator", 
                    description: "Creative AI application generating personalized children's stories with text-to-image and voice output capabilities.",
                    link: "https://github.com/Mari-kn/Kids-Story-OpenAI",
                    tech: ["OpenAI", "Text-to-Speech", "Creative AI"]
                }
            ]
        },
        contact: {
            title: "Get In Touch",
            subtitle: "Let's connect and discuss opportunities in AI and data science.",
            phone: "+49 176 24014105",
            email: "Mariakiani9@gmail.com",
            altEmail: "mariakiani9@gmail.com",
            linkedin: "https://www.linkedin.com/in/maria-kiani/",
            github: "https://github.com/Mari-kn",
            location: "Potsdam, Germany"
        }
    },
    de: {
        nav: {
            home: "Startseite",
            about: "Über mich", 
            experience: "Erfahrung",
            projects: "Projekte",
            contact: "Kontakt"
        },
        skipToMain: "Zum Hauptinhalt springen",
        skipToNav: "Zur Navigation springen",
        hero: {
            name: "Maria Kiani",
            title: `KI-Ingenieurin & Data Scientist | Über ${experienceYears}+ Jahre Erfahrung in datengetriebener Business Intelligence`,
            subtitle: "Business Intelligence durch KI-Innovationen transformieren",
            summary: `Ich bin eine erfahrene KI-Ingenieurin mit Masterabschlüssen in Software Engineering und Data Science und über ${experienceYears}+ Jahren nachweislicher Erfahrung darin, komplexe Daten in strategischen Geschäftswert zu überführen. Ich habe mehr als 2.500 Analyst:innen gecoacht und branchenübergreifend innovative, skalierbare Lösungen umgesetzt. Derzeit treibe ich die Entwicklung KI-gestützter Anwendungen in Deutschlands wachsender Tech-Landschaft voran und verknüpfe dabei tiefgehende technische Expertise mit ausgeprägtem Geschäftsverständnis, um messbare Ergebnisse zu erzielen.`,
            location: "Potsdam, Deutschland"
        },
        about: {
            title: "Über mich",
            content: `Als erfahrene KI-Ingenieurin und Data Scientist bringe ich über ${experienceYears} Jahre praktische Expertise in der Transformation von Daten in umsetzbare Geschäftserkenntnisse mit. Meine Reise begann mit einer soliden Grundlage in Software Engineering und entwickelte sich zu einer dynamischen Karriere an der Schnittstelle von Data Science und künstlicher Intelligenz. Mit einem kürzlich erworbenen Master-Abschluss in Data Science aus Deutschland und einer Spezialisierung auf KI habe ich wirkungsvolle Projekte geleitet, die von der Betrugserkennung in Kryptowährungen bis zur Zeitreihenprognose digitaler Assets wie XRP und Bitcoin reichen. Meine Arbeit integriert moderne Tools wie Python, LangChain und Cloud-Plattformen einschließlich AWS, Azure und GCP, um intelligente, skalierbare Lösungen zu schaffen.\n\nMein Ansatz ist tief in der Ausrichtung fortgeschrittener Analytik auf reale Geschäftsziele verwurzelt. Als Freiberuflerin habe ich KI-gestützte Anwendungen entwickelt, die das User-Onboarding automatisieren, SEO-optimierte Inhalte generieren und HR-KPIs aus unstrukturierten Dokumenten mittels LLMs extrahieren. Diese Projekte spiegeln meine Kernüberzeugung wider: KI sollte Komplexität vereinfachen und messbaren Wert freisetzen. Ob bei der Entwicklung RAG-basierter Chatbots, Modellen zur Vorhersage von Kundenabwanderung oder dem Deployment von NLP-Pipelines in der Cloud - ich strebe stets danach, technische Innovation mit strategischem Geschäftsnutzen zu verbinden.\n\nIch werde von einer Leidenschaft für kontinuierliches Lernen und einem Engagement für Exzellenz angetrieben. Über die Bereitstellung von Lösungen hinaus betreue ich aktiv Junior-Datenprofis und trage zu Bildungsprojekten bei, einschließlich der Autorenschaft von Büchern über COBIT 5 und Excel für Datenanalysten. Derzeit in Potsdam, Deutschland, ansässig, erkunde ich weiterhin neue Grenzen in der KI und arbeite an Projekten, die Predictive Modeling, Natural Language Processing und Cloud-native Entwicklung kombinieren. Ich lade Sie ein, sich mit mir zu vernetzen, wenn Sie die Kraft der KI für Ihre Geschäftstransformation nutzen möchten.`,
            expertise: {
                focus: "KI-Engineering & Machine Learning Operations",
                specialization: "Produktions-KI-Systeme & Business Intelligence",
                industries: "FinTech, E-Commerce, Gesundheitswesen, Digital Marketing",
                achievements: "2.500+ Fachkräfte betreut | 48% Effizienzsteigerungen"
            }
        },
        skills: {
            title: "Technische Fähigkeiten",
            categories: {
                programming: "Programmiersprachen",
                ai: "KI-Technologien",
                ml: "Machine Learning",
                etl: "ETL-Werkzeuge",
                visualization: "Datenvisualisierung",
                analytics: "Statistische Analysen",
                cloud: "Cloud-Plattformen",
                tools: "Entwicklungstools"
            },
            items: {
                programming: ["Python", "SQL", "C#"],
                ai: ["OpenAI", "Retrieval-Augmented Generation", "Langchain"],
                ml: ["Scikit-learn", "PySpark", "TensorFlow", "PyTorch", "Deep Learning"],
                etl: ["Apache Airflow", "dbt", "SSIS", "Power Query"],
                visualization: ["Power BI", "Tableau", "Matplotlib", "Seaborn"],
                analytics: ["Regressionsanalyse", "Hypothesentests", "Zeitreihenanalyse"],
                cloud: ["Azure","Google Cloud Platform", "BigQuery", "AWS"],
                tools: ["Git", "GitHub", "Excel"]
            }
        },
        experience: {
            title: "Berufserfahrung",
            jobs: [
                {
                    title: "KI-Ingenieurin",
                    company: "Freiberuflich",
                    location: "Deutschland (Remote/Hybrid)",
                    period: "Okt 2024 – Heute",
                    type: "Freiberuflich",
                    description: "- Arbeite an KI-gestützter Digital-Marketing-Lösung.\n- Implementierte eine intelligente Lösung zur Unterstützung der Registrierung neuer Benutzer mit LLMs, Python, OCR.\n- Entwickelte ein automatisiertes System zur Generierung SEO-optimierter Inhalte mit Python, Fine-tuning OpenAI, OLlama, LangChain, HTML und Javascript.\n- Entwickelte eine Webanwendung zur Extraktion von HR-bezogenen KPIs aus PDFs und Bildern in 4 vom Benutzer ausgewählten Kategorien und Speicherung in Azure SQL für agile Einblicke in globale HR-KPI-Standards unter Verwendung von Azure AI Services, Python, HTML, CSS, API-Programmierung und OpenAI.\n- Entwickelte ein Customer-Churn-Prediction-Modell für B2C-Unternehmen mit Python.\n- Entwickelte Chatbot mit RAG unter Verwendung von AWS AI Service, Python, Streamlit.\n- Finalisierte XRP- und Bitcoin-Vorhersageprojekt mit Deep-Learning-Modellen für Zeitreihen basierend auf Marktanalyse und Sentiment-Analyse.",
                    link: null
                },
                {
                    title: "Berufliche Auszeit",
                    company: "Berufliche Weiterbildung",
                    location: "Potsdam, Deutschland",
                    period: "03/2024 – 09/2024",
                    type: "Berufliche Auszeit",
                    description: "- Abschluss eines projektbasierten Kurses zu KI-Entwicklerthemen mit praktischen Erfahrungen beim Deployment von KI-Lösungen.\n- Vertiefung der Expertise in Azure AI, AWS, Deep Learning durch Selbststudium.\n- Erfolgreicher Abschluss der Masterarbeit zum Thema Betrugserkennung.\n- Kundenbetreuung für Kunden des vorherigen Unternehmens.\n- Verbesserung der deutschen Sprachkenntnisse.",
                    link: null
                },
                {
                    title: "Data-Analysis-Consultant",
                    company: "Darsoon",
                    location: "Ontario, Kanada (Remote)",
                    period: "01/2023 – 03/2024", 
                    type: "Teilzeit",
                    description: "\n- Analysierte Goldpreis-Nachrichten mit der Guardian-API und Python, erkannte Ausreißer in Zeitreihen und erforschte deren Ursachen.\n- Transformierte Google-Analytics-Daten mit dbt, visualisierte BigQuery-Daten in Tableau und zeigte, dass Stammkunden 60% des Umsatzes ausmachen.\n- Betreute Junior-Analysten in SQL, Python, Power BI und Excel.\n- Eignete sich Prozesse rasch an und beschleunigte Analytikprojekte.",
                    link: "https://darsoon.com/en"
                },
                {
                    title: "Senior Data Analyst",
                    company: "Favagostar",
                    location: "Teheran, Iran",
                    period: "03/2019 – 01/2023",
                    type: "Hybrid-Vollzeit",
                    description: "\n- Steigerte die Wiederbuchungsrate eines Home-Service-Providers um 48% durch Datenbereinigung und A/B-Tests.\n- Analysierte Projektprozesse und senkte Kosten um 32%, errichtete ein Sternschema-Data-Warehouse und erstellte Power-BI-Dashboards.\n- Definierte Kennzahlen und Dashboards für über 10 Unternehmen aus Branchen wie Industrie-Klebstoffe, Ölhandel, Krypto-Portfolios, E-Commerce, Hotellerie, HR und Digital-Marketing.\n- Verantwortete Ad-hoc-Reports, schulte rund 30 Firmenmitarbeiter.\n- Erhielt drei Jahre in Folge Leistungsprämien und gewann Großkunden durch innovative Ideen.",
                    link: "https://persiafava.com/"
                },
                {
                    title: "Dozentin",
                    company: "Azad University", 
                    location: "Teheran, Iran",
                    period: "01/2014 – 01/2019",
                    type: "Vollzeit",
                    description: "Vermittelte SQL Server, Excel und Python-Programmierung an Universitätsstudenten.",
                    link: "https://qods.iau.ir/fa"
                },
                {
                    title: "Data Analystin",
                    company: "Mellat Bank",
                    location: "Teheran, Iran",
                    period: "12/2011 – 03/2014", 
                    type: "Vollzeit",
                    description: "- Optimierte IT-Prozesse für Irans größte Bank.\n- Erstellte HR-, Produkt- und Service-Dashboards mit Power Query und Excel.\n- Definierte KPIs in Abstimmung mit Stakeholdern.\n- Erhielt Manager-Auszeichnung für herausragende Projektleistungen.",
                    link: "https://bankmellat.ir/default.aspx"
                },
                {
                    title: "Full Stack Entwickler",
                    company: "Asan Software",
                    location: "Teheran, Iran", 
                    period: "04/2010 – 11/2011",
                    type: "Vollzeit",
                    description: "\n- C#, WPF und LINQ Programmierung für Gehaltsabrechnungssystem.\n- Entwurf und Implementierung der SQL Server Datenbank.",
                    link: "https://bankmellat.ir/default.aspx"
                }
            ]
        },
        education: {
            title: "Ausbildung",
            degrees: [
                {
                    degree: "Master of Science in Data Science",
                    school: "University of Europe for Applied Sciences",
                    location: "Potsdam, Deutschland", 
                    year: "August 2024"
                },
                {
                    degree: "Bachelor of Science in Computer Science",
                    school: "Bahounar University",
                    location: "Kerman, Iran",
                    year: "Mai 2010"
                }
            ]
        },
        certifications: {
            title: "Zertifikate",
            items: [
                {
                    name: "Generative AI for Developers",
                    org: "Coyotiv Academy",
                    year: "2024"
                },
                {
                    name: "Statistical Thinking in Python",
                    org: "DataCamp",
                    year: "2023"
                },
                {
                    name: "SQL Server Design", 
                    org: "Faratar az Danesh Academy",
                    year: "2022"
                },
                {
                    name: "Designing BI Solutions with Microsoft SQL Server",
                    org: "Nikamooz",
                    year: "2015"
                },
                {
                    name: "SQL Server Query",
                    org: "Faratar az Danesh Academy",
                    year: "2012"
                },
                {
                    name: "Scrum Master Certificate of Proficiency",
                    org: "Barnamenevis Academy",
                    year: "2012"
                }
            ]
        },
        projects: {
            title: "Ausgewählte Projekte",
            items: [
                {
                    name: "KI-gestütztes digitales Marketing",
                    description: "Implementierung einer KI-gestützten Digital-Marketing-Lösung.",
                    link: "Kommerzielles Projekt",
                    tech: ["LLMs","Python","Langchain"]
                },
                {
                    name: "KI-Registrierungsassistent",
                    description: "Implementierte eine intelligente Lösung zur Unterstützung der Registrierung neuer Benutzer mit LLMs, Python, OCR.",
                    link: "Kommerzielles Projekt",
                    tech: ["Python","LLMs", "OCR", "WebScrap"]
                },
                {
                    name: "KI-gestützte SEO-optimierte Lösung",
                    description: "Entwickelte ein automatisiertes System zur Generierung SEO-optimierter Inhalte mit Python, Fine-tuning OpenAI, OLlama, LangChain, HTML und Javascript.",
                    link: "Kommerzielles Projekt",
                    tech: ["Python","LLMs","RAG","Fine-tuning"]
                },
                {
                    name: "Energieverbrauchs-Prognose",
                    description: "Python-basiertes Machine-Learning-Modell zur Vorhersage von Energieverbrauchsmustern mittels Zeitreihenanalyse und Regressionstechniken.",
                    link: "https://github.com/Mari-kn/Energy_Consumption_Prediction_Python",
                    tech: ["Python", "Machine Learning", "Zeitreihen"]
                },
                {
                    name: "E-Commerce-Empfehlungssystem",
                    description: "Intelligentes Produktempfehlungssystem, das ähnliche Produkte identifiziert und die Kundenerfahrung durch kollaborative Filterung verbessert.",
                    link: "https://github.com/Mari-kn/Recommender_System", 
                    tech: ["Python", "Kollaborative Filterung", "Data Science"]
                },
                {
                    name: "Betrugserkennung in Kryptowährungen",
                    description: "Fortschrittliches Betrugserkennungssystem für Kryptowährungstransaktionen mit Machine-Learning-Algorithmen und Anomalieerkennung.",
                    link: "https://github.com/Mari-kn/Fraud_Detection_Crypto_Python",
                    tech: ["Python", "Betrugserkennung", "Blockchain"]
                },
                {
                    name: "Aktienprognose mit Sentiment-Analyse",
                    description: "Aktienkursprognosemodell, das Sentiment-Analyse von Nachrichtendaten mit technischen Indikatoren unter Verwendung von Hugging Face Transformers kombiniert.",
                    link: "https://github.com/Mari-kn/Stock_Prediction_Sentiment_Huggingface",
                    tech: ["Python", "NLP", "Finanzanalyse"]
                },
                {
                    name: "Kryptowährungs-Deep-Learning-Prognose",
                    description: "Deep-Learning-Modell für XRP- und Bitcoin-Zeitreihenprognosen kombiniert mit umfassender Marktanalyse.",
                    link: "https://github.com/Mari-kn/CryptoCurrency_Prediction_DeepLearning",
                    tech: ["Deep Learning", "TensorFlow", "Kryptowährung"]
                },
                {
                    name: "Kundenabwanderungs-Prognose",
                    description: "Machine-Learning-Lösung zur Vorhersage von Kundenabwanderung in IT-Dienstleistungen unter Verwendung von Techniken für unausgewogene Daten.",
                    link: "https://github.com/Mari-kn/Customer_Churn_Prediction_Imbalenced_Data",
                    tech: ["Python", "Unausgewogene Daten", "Klassifikation"]
                },
                {
                    name: "KI-gestützter Kundenservice",
                    description: "Automatisiertes Kundenservice-System basierend auf OpenAI und Retrieval-Augmented Generation (RAG) für intelligente Anfragebearbeitung.",
                    link: "https://github.com/Mari-kn/call-center-GenAI",
                    tech: ["OpenAI", "RAG", "Kundenservice"]
                },
                {
                    name: "Gesundheits-Chatbot mit OpenAI",
                    description: "Intelligenter Gesundheitsberatungs-Chatbot mit OpenAI und Pinecone-Vektordatenbank für präzise medizinische Informationsabfrage.",
                    link: "https://github.com/Mari-kn/Chatbot_OpenAI/",
                    tech: ["OpenAI", "Pinecone", "Gesundheitswesen"]
                },
                {
                    name: "KI-Kinder-Geschichten-Generator",
                    description: "Kreative KI-Anwendung zur Generierung personalisierter Kindergeschichten mit Text-zu-Bild- und Sprachausgabefunktionen.",
                    link: "https://github.com/Mari-kn/Kids-Story-OpenAI",
                    tech: ["OpenAI", "Text-zu-Sprache", "Kreative KI"]
                }
            ]
        },
        contact: {
            title: "Kontakt aufnehmen",
            subtitle: "Lassen Sie uns verbinden und Möglichkeiten in KI und Data Science besprechen.",
            phone: "+49 176 24014105",
            email: "Mariakiani9@gmail.com", 
            altEmail: "mariakiani9@gmail.com",
            linkedin: "https://www.linkedin.com/in/maria-kiani/",
            github: "https://github.com/Mari-kn",
            location: "Potsdam, Deutschland"
        }
    }
};

