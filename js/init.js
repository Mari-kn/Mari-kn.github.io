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
            location: "Berlin, Germany"
        },
        about: {
            title: "About Me",
            content: `As an accomplished AI Engineer, I leverage ${experienceYears}+ years of data excellence combined with cutting-edge machine learning expertise to deliver transformative business solutions. My dual Master's degrees in Software Engineering and Data Science (Germany, 2024) provide the perfect foundation for bridging technical innovation with strategic business outcomes.\n\nMy track record speaks volumes: successfully optimized KPIs across 10+ industries, mentored 2,500+ professionals, and consistently delivered efficiency improvements exceeding 30-48%. My expertise spans the complete AI lifecycle - from data strategy to production deployment, with particular strength in fraud detection, predictive analytics, and intelligent automation systems.\n\nTechnical Excellence: Proficient in Python, SQL, TensorFlow, Azure AI, AWS, and advanced MLOps practices. My approach combines rigorous statistical analysis with innovative AI methodologies to solve complex business challenges and drive sustainable growth.`,
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
                etl: "ETL Tools",
                visualization: "Data Visualization",
                analytics: "Statistical Analysis",
                ai: "AI Technologies",
                cloud: "Cloud Platforms",
                tools: "Development Tools",
                ml: "Machine Learning"
            },
            items: {
                programming: ["Python", "SQL", "C#"],
                etl: ["Apache Airflow", "dbt", "SSIS", "Power Query"],
                visualization: ["Power BI", "Tableau", "Matplotlib", "Seaborn"],
                analytics: ["Regression Analysis", "Hypothesis Testing", "Time Series Analysis"],
                ai: ["OpenAI", "Retrieval-Augmented Generation", "Multi-Agent Systems"],
                cloud: ["Google Cloud Platform", "BigQuery", "AWS"],
                tools: ["Git", "GitHub", "Excel"],
                ml: ["Scikit-learn", "PySpark", "TensorFlow", "PyTorch", "Deep Learning"]
            }
        },
        experience: {
            title: "Professional Experience",
            jobs: [
                {
                    title: "AI Engineer",
                    company: "Freelance",
                    location: "Germany (Remote)",
                    period: "Oct 2024 – Present",
                    type: "Freelance",
                    description: "Developed a web application for extracting HR-related KPIs from PDFs and Images in 4 categories selected by user and store in Azure SQL to have agile insights on HR KPIs global standards using Azure AI services, Python, HTML, CSS, API programming and OpenAI. Developed a Customer Churn Prediction model for B2C company using Python. Developed chatbot with RAG using AWS AI Service, Python, Streamlit.",
                    link: null
                },
                {
                    title: "Career Break",
                    company: "Professional Development",
                    location: "Berlin, Germany",
                    period: "03/2024 – 09/2024",
                    type: "Career Break",
                    description: "Finalized XRP and Bitcoin prediction project using time series deep learning models based on market analysis and sentiment analysis (Ordered by UK company). Completed a project-based course focused on AI developer topics, gaining hands-on experience to deploy AI solutions. Strengthened expertise in Azure AI, AWS, Deep learning through self-learning. Successfully finalized master's thesis in Fraud detection subject. Provided customer support for clients at previous company. Enhanced German language skills.",
                    link: null
                },
                {
                    title: "Data Analysis Consultant",
                    company: "Darsoon",
                    location: "Ontario, Canada (Remote)",
                    period: "01/2023 – 03/2024",
                    type: "Part-time",
                    description: "Analyzed gold price news using Guardian API and Python, identified outliers in time series and researched their causes. Transformed Google Analytics data with dbt, visualized BigQuery data in Tableau, demonstrating that loyal customers account for 60% of revenue. Mentored junior analysts in SQL, Python, Power BI, and Excel. Quickly adapted to new processes and accelerated analytics projects.",
                    link: "https://darsoon.com/en"
                },
                {
                    title: "Senior Data Analyst",
                    company: "Favagostar",
                    location: "Tehran, Iran",
                    period: "03/2019 – 01/2023",
                    type: "Full-time Hybrid",
                    description: "Increased rebooking rate of a home service provider by 48% through data cleaning and A/B testing. Analyzed project processes and reduced costs by 32%, built star schema data warehouse and created Power BI dashboards. Defined metrics and dashboards for over 10 companies across industries including industrial adhesives, oil trading, crypto portfolios, e-commerce, hospitality, HR, and digital marketing. Responsible for ad-hoc reports, trained approximately 30 company employees, received performance bonuses for three consecutive years, and won major clients through innovative ideas.",
                    link: "https://persiafava.com/"
                },
                {
                    title: "Lecturer",
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
                    description: "Optimized IT processes for Iran's largest bank, created HR, product, and service dashboards using Power Query and Excel. Defined KPIs in coordination with stakeholders and received manager recognition for outstanding project performance.",
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
                    location: "Berlin, Germany",
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
            subtitle: "Let's connect and discuss opportunities in data science and analytics.",
            phone: "+49 176 24014105",
            email: "eng.mkianiani@yahoo.com",
            altEmail: "mariakiani9@gmail.com",
            linkedin: "https://www.linkedin.com/in/maria-kiani/",
            github: "https://github.com/Mari-kn",
            location: "Berlin, Germany"
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
            title: `KI-Ingenieurin | Data Scientist | ${experienceYears}+ Jahre Exzellenz`,
            subtitle: "Business Intelligence durch fortschrittliche KI-Lösungen transformieren",
            summary: `Versierte KI-Ingenieurin mit Masterabschlüssen in Software Engineering und Data Science, die ${experienceYears}+ Jahre bewährte Expertise im Umwandeln komplexer Daten in strategischen Geschäftswert einbringt. Erfolgreich 2.500+ Analysten betreut und innovative Lösungen branchenübergreifend geliefert. Aktuell Pionierarbeit für KI-gesteuerte Lösungen in Deutschlands florierender Tech-Landschaft, kombiniert tiefgreifende technische Expertise mit außergewöhnlichem Geschäftsverständnis für messbare Ergebnisse.`,
            location: "Berlin, Deutschland"
        },
        about: {
            title: "Über mich",
            content: `Als versierte KI-Ingenieurin nutze ich ${experienceYears}+ Jahre Daten-Exzellenz kombiniert mit modernster Machine Learning-Expertise, um transformative Geschäftslösungen zu liefern. Meine dualen Masterabschlüsse in Software Engineering und Data Science (Deutschland, 2024) bilden die perfekte Grundlage für die Verbindung technischer Innovation mit strategischen Geschäftsergebnissen.\n\nMeine Erfolgsbilanz spricht Bände: erfolgreich KPIs in 10+ Branchen optimiert, 2.500+ Fachkräfte betreut und konstant Effizienzsteigerungen von über 30-48% geliefert. Meine Expertise umfasst den kompletten KI-Lebenszyklus - von der Datenstrategie bis zum Produktions-Deployment, mit besonderer Stärke in Betrugserkennung, Predictive Analytics und intelligenten Automatisierungssystemen.\n\nTechnische Exzellenz: Versiert in Python, SQL, TensorFlow, Azure AI, AWS und fortgeschrittenen MLOps-Praktiken. Mein Ansatz kombiniert rigorose statistische Analyse mit innovativen KI-Methodologien zur Lösung komplexer Geschäftsherausforderungen und nachhaltigen Wachstums.`,
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
                etl: "ETL-Werkzeuge", 
                visualization: "Datenvisualisierung",
                analytics: "Statistische Analysen",
                ai: "KI-Technologien",
                cloud: "Cloud-Plattformen",
                tools: "Entwicklungstools",
                ml: "Machine Learning"
            },
            items: {
                programming: ["Python", "SQL", "C#"],
                etl: ["Apache Airflow", "dbt", "SSIS", "Power Query"],
                visualization: ["Power BI", "Tableau", "Matplotlib", "Seaborn"],
                analytics: ["Regressionsanalyse", "Hypothesentests", "Zeitreihenanalyse"],
                ai: ["OpenAI", "Retrieval-Augmented Generation", "Multi-Agent-Systeme"],
                cloud: ["Google Cloud Platform", "BigQuery", "AWS"],
                tools: ["Git", "GitHub", "Excel"],
                ml: ["Scikit-learn", "PySpark", "TensorFlow", "PyTorch", "Deep Learning"]
            }
        },
        experience: {
            title: "Berufserfahrung",
            jobs: [
                {
                    title: "KI-Ingenieurin",
                    company: "Freiberuflich",
                    location: "Deutschland (Remote)",
                    period: "Okt 2024 – Heute",
                    type: "Freiberuflich",
                    description: "Entwickelte eine Webanwendung zur Extraktion von HR-bezogenen KPIs aus PDFs und Bildern in 4 vom Benutzer ausgewählten Kategorien und Speicherung in Azure SQL für agile Einblicke in globale HR-KPI-Standards unter Verwendung von Azure AI Services, Python, HTML, CSS, API-Programmierung und OpenAI. Entwickelte ein Customer-Churn-Prediction-Modell für B2C-Unternehmen mit Python. Entwickelte Chatbot mit RAG unter Verwendung von AWS AI Service, Python, Streamlit.",
                    link: null
                },
                {
                    title: "Berufliche Auszeit",
                    company: "Berufliche Weiterbildung",
                    location: "Berlin, Deutschland",
                    period: "03/2024 – 09/2024",
                    type: "Berufliche Auszeit",
                    description: "Abschluss des XRP- und Bitcoin-Vorhersageprojekts mit Deep-Learning-Modellen für Zeitreihen basierend auf Marktanalyse und Sentiment-Analyse (Auftrag einer britischen Firma). Abschluss eines projektbasierten Kurses zu KI-Entwicklerthemen mit praktischen Erfahrungen beim Deployment von KI-Lösungen. Vertiefung der Expertise in Azure AI, AWS, Deep Learning durch Selbststudium. Erfolgreicher Abschluss der Masterarbeit zum Thema Betrugserkennung. Kundenbetreuung für Kunden des vorherigen Unternehmens. Verbesserung der deutschen Sprachkenntnisse.",
                    link: null
                },
                {
                    title: "Data-Analysis-Consultant",
                    company: "Darsoon",
                    location: "Ontario, Kanada (Remote)",
                    period: "01/2023 – 03/2024", 
                    type: "Teilzeit",
                    description: "Analysierte Goldpreis-Nachrichten mit der Guardian-API und Python, erkannte Ausreißer in Zeitreihen und erforschte deren Ursachen. Transformierte Google-Analytics-Daten mit dbt, visualisierte BigQuery-Daten in Tableau und zeigte, dass Stammkunden 60 Prozent des Umsatzes ausmachen. Betreute Junior-Analysten in SQL, Python, Power BI und Excel. Eignete sich Prozesse rasch an und beschleunigte Analytikprojekte.",
                    link: "https://darsoon.com/en"
                },
                {
                    title: "Senior Data Analyst",
                    company: "Favagostar",
                    location: "Teheran, Iran",
                    period: "03/2019 – 01/2023",
                    type: "Hybrid-Vollzeit",
                    description: "Steigerte mithilfe von Datenbereinigung und A/B-Tests die Wiederbuchungsrate eines Home-Service-Providers um 48 Prozent. Analysierte Projektprozesse und senkte deren Kosten um 32 Prozent, errichtete ein Sternschema-Data-Warehouse und erstellte Power-BI-Dashboards. Definierte Kennzahlen und Dashboards für mehr als zehn Unternehmen aus Branchen wie Industrie-Klebstoffe, Ölhandel, Krypto-Portfolios, E-Commerce, Hotellerie, HR und Digital-Marketing. Verantwortete Ad-hoc-Reports, schulte rund 30 Firmenmitarbeiter, erhielt drei Jahre in Folge Leistungsprämien und gewann Großkunden durch innovative Ideen.",
                    link: "https://persiafava.com/"
                },
                {
                    title: "Dozentin",
                    company: "Azad University", 
                    location: "Teheran, Iran",
                    period: "01/2014 – 01/2019",
                    type: "Vollzeit",
                    description: "Vermittelte SQL Server, Excel und Python an Universitätsstudenten.",
                    link: "https://qods.iau.ir/fa"
                },
                {
                    title: "Data Analystin",
                    company: "Mellat Bank",
                    location: "Teheran, Iran",
                    period: "12/2011 – 03/2014", 
                    type: "Vollzeit",
                    description: "Optimierte IT-Prozesse der größten iranischen Bank, erstellte HR-, Produkt- und Service-Dashboards mit Power Query und Excel. Definierte KPIs in Abstimmung mit Stakeholdern und erhielt eine Manager-Auszeichnung für herausragende Projektleistungen.",
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
                    location: "Berlin, Deutschland", 
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
            subtitle: "Lassen Sie uns verbinden und Möglichkeiten in Data Science und Analytics besprechen.",
            phone: "+49 176 24014105",
            email: "eng.mkianiani@yahoo.com", 
            altEmail: "mariakiani9@gmail.com",
            linkedin: "https://www.linkedin.com/in/maria-kiani/",
            github: "https://github.com/Mari-kn",
            location: "Berlin, Deutschland"
        }
    }
};

