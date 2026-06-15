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
            name: "Marzieh Maria Kianiani",
            title: `AI Engineer | Data Scientist | ${experienceYears}+ Years Excellence in Data and 3+ in AI`,
            subtitle: "Transforming Business Intelligence through Advanced AI Solutions",
            summary: `Accomplished AI Engineer with Master's degrees in Software Engineering and Data Science, bringing ${experienceYears}+ years of proven expertise in transforming complex data into strategic business value. Successfully mentored 2,500+ analysts while delivering innovative solutions across multiple industries. Currently pioneering AI-driven solutions in Germany's thriving tech ecosystem, combining deep technical expertise with exceptional business acumen to drive measurable results.`,
            location: "Potsdam, Germany"
        },
        about: {
            title: "About Me",
            content: `AI Engineer and Data Scientist with 3+ years of experience building production-ready LLM and NLP systems that transform unstructured data into actionable business insights. I design and deploy end-to-end AI solutions — including Retrieval-Augmented Generation (RAG), document intelligence, and AI-driven automation — and develop scalable applications using Python, LangChain, and cloud platforms (GCP/AWS/Azure), covering the full ML lifecycle from data processing and model development to deployment and optimization.\n\nBefore moving into AI Engineering, I spent over a decade as a Senior Data Analyst and Data Scientist, bringing strong analytical thinking and business understanding into AI system design. I have trained employees from more than 30 companies in data analysis. After relocating to Germany in 2023 to advance my career, I completed a second Master's degree in Data Science and an intensive AI upskilling program, and now focus on combining technical AI expertise with real business impact.`,
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
                genai: "GenAI & LLM",
                software: "Software Engineering",
                ml: "Machine Learning & Predictive Modeling",
                databases: "Databases",
                cloud: "Cloud Platforms",
                statistics: "Statistics & Experimentation",
                versioncontrol: "Version Control"
            },
            items: {
                genai: ["LLMs", "RAG", "Prompt Engineering", "Document Intelligence", "NLP Pipelines", "Agentic Workflows (LangChain, n8n)", "Hugging Face", "OpenAI/Anthropic APIs", "Docker"],
                software: ["Python", "SQL", "C#", "FastAPI", "Clean Architecture"],
                ml: ["Supervised & Unsupervised Learning (Scikit-learn)", "Deep Learning (TensorFlow, PyTorch)", "Time-Series Forecasting", "Feature Engineering & Model Evaluation", "PySpark"],
                databases: ["pgvector", "Pinecone", "MS SQL Server", "BigQuery", "Snowflake"],
                cloud: ["AWS", "GCP", "Azure"],
                statistics: ["Regression Analysis", "Hypothesis Testing", "A/B Testing"],
                versioncontrol: ["GitHub", "CI/CD"]
            }
        },
        experience: {
            title: "Professional Experience",
            jobs: [
                {
                    title: "AI Engineer / Data Scientist",
                    company: "Freelance",
                    location: "Germany (Remote)",
                    period: "Oct 2024 – Present",
                    type: "Freelance",
                    description: "Building production-ready LLM, RAG, and NLP systems end-to-end for clients across industries.\n\n• AI Content Automation Platform (Luninora GmbH): Designed and deployed an LLM and RAG platform that generates on-brand marketing content from a curated knowledge base, with embeddings-based retrieval for context grounding. Reduced content production time by 70% (from ~4 hrs to ~1 hr per piece), scaled output to 200+ assets/month, and cut reliance on external copywriting, saving an estimated €2–3K/month. Stack: Python, LangChain, OpenAI GPT-4o, pgvector, FastAPI, GCP Cloud Run.\n\n• LLM Document Intelligence for KPI Extraction (Agile Insight): Built an end-to-end system that extracts structured HR KPIs from unstructured PDFs. Processed ~500 documents/month, cut manual data entry by 80% (from ~20 to ~4 hrs/week), and achieved ~95% field-level extraction accuracy via prompt engineering and Pydantic schema validation with human-in-the-loop review. Stack: Python, LangChain, Azure Document Intelligence, GPT-4o, Streamlit.\n\n• RAG-Based Enterprise Document Chatbot (Agile Insight): Developed a context-aware chatbot that lets employees query internal documents in natural language via semantic search over a vector store. Indexed 1000+ documents, reduced average lookup time from ~15 min to under 1 min, and delivered ~90% answer relevance using chunking optimization, hybrid retrieval, and source-citation grounding to reduce hallucinations. Stack: Agentic RAG, Python, LangChain, Firestore vector search, GPT-4o.\n\n• Customer Churn Prediction Model (Wilhelm.tel): Built a supervised ML model for predictive churn risk scoring to support proactive retention. Achieved 92% recall, identifying the top ~20% highest-risk customers, and reduced churn by ~12% among at-risk customers. Stack: Python, scikit-learn, XGBoost, pandas, BigQuery.",
                    link: null
                },
                {
                    title: "AI / Cloud / ML — Intensive Upskilling Program",
                    company: "Professional Development",
                    location: "Potsdam, Germany",
                    period: "03/2024 – 09/2024",
                    type: "Professional Development",
                    description: "- Built deep-learning time-series models to forecast XRP and Bitcoin prices, combining market data with sentiment analysis of news and social signals, achieving 94% precision.\n- Completed a Master's thesis on fraud detection in Ethereum transactions, engineering features from on-chain data and training XGBoost to flag fraudulent transactions at ~90%+ precision.\n- Delivered an end-to-end AI capstone: trained a model and deployed it to production on GCP Cloud Run with Docker and FastAPI, covering the full lifecycle from data preparation to serving.",
                    link: null
                },
                {
                    title: "Data Scientist / Analyst Consultant",
                    company: "Darsoon",
                    location: "Ontario, Canada (Remote)",
                    period: "01/2023 – 03/2024",
                    type: "Part-time",
                    description: "\n- Worked with the product team on an e-commerce analytics project in the pharmaceutical industry, identifying that repeat customers accounted for 60% of total revenue and revealing a significant opportunity for loyalty-focused marketing strategies. \n- Transformed Google Analytics and OLTP data with dbt and visualized BigQuery data. \n- Reduced employment costs by automating news analysis with the Guardian Media Group API and Python to detect anomalies in time series and investigate their causes. \n- Mentored junior data analysts in SQL, Python, and Power BI.",
                    link: "https://darsoon.com/en"
                },
                {
                    title: "Senior Data Analyst",
                    company: "Favagostar",
                    location: "Tehran, Iran",
                    period: "03/2019 – 01/2023",
                    type: "Full-time Hybrid",
                    description: "\n- Increased the rebooking rate by 48% for a home-service provider through data-driven insights and strategic integrations, including A/B testing in Power BI and Python and a win-back strategy for canceled appointments. \n- Slashed project process costs by 32% for a healthcare project-management company by integrating data from multiple sources, implementing a star-schema data warehouse, and building Power BI dashboards that influenced key decisions. \n- Derived KPIs together with stakeholders and delivered ad-hoc reporting. \n- Trained employees from over 30 companies in data analysis.",
                    link: "https://persiafava.com/"
                },
                {
                    title: "Data Analysis Lecturer",
                    company: "Azad University",
                    location: "Tehran, Iran",
                    period: "01/2014 – 01/2019",
                    type: "Full-time",
                    description: "Taught SQL Server, Excel, and Python as a data analysis lecturer.",
                    link: "https://qods.iau.ir/fa"
                },
                {
                    title: "Data Analyst",
                    company: "Mellat Bank",
                    location: "Tehran, Iran",
                    period: "12/2011 – 03/2014",
                    type: "Full-time",
                    description: "- Designed dashboards providing an overview of human-resources and procurement performance and contributed to stakeholder discussions to derive KPIs. \n- Analyzed IT processes and defined KPIs based on the COBIT 5 framework to measure alignment with standards, earning an outstanding-performance award.",
                    link: "https://bankmellat.ir/default.aspx"
                },
                {
                    title: "Full-stack Developer",
                    company: "Asan Software",
                    location: "Tehran, Iran",
                    period: "04/2010 – 11/2011",
                    type: "Full-time",
                    description: "- Developed a payroll system as a C#, WPF, and LINQ programmer. \n- Designed the SQL Server database.",
                    link: null
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
                    year: "2024"
                },
                {
                    degree: "Master of Science in Software Engineering",
                    school: "Science and Research University",
                    location: "Tehran, Iran",
                    year: "2013"
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
            name: "Marzieh Maria Kianiani",
            title: `KI-Ingenieurin | Data Scientist | ${experienceYears}+ Jahre Erfahrung im Datenbereich und 3+ in KI`,
            subtitle: "Geschäftsimpact durch KI & Machine Learning",
            summary: `Mit einem Masterabschluss in Software Engineering und über ${experienceYears} Jahren Erfahrung im Datenbereich habe ich Unternehmen dabei geholfen, Wert durch den Einsatz von KI und Daten zu schaffen. 2023 nach Deutschland gezogen, um meine Karriere voranzutreiben, zweiten Masterabschluss in Data Science abgeschlossen. KI-Kurs finalisiert, Entscheidung für Übergang zu KI-Engineering getroffen, um technische Expertise mit Geschäftserfahrung zu kombinieren. Arbeit an KI-Projekt in der Industrie.`,
            location: "Potsdam, Deutschland"
        },
        about: {
            title: "Über mich",
            content: `KI-Ingenieurin und Data Scientist mit mehr als 3 Jahren Erfahrung im Aufbau produktionsreifer LLM- und NLP-Systeme, die unstrukturierte Daten in nützliche Geschäftserkenntnisse verwandeln. Ich plane und baue End-to-End-AI-Lösungen — darunter Retrieval-Augmented Generation (RAG), Document Intelligence und KI-Automatisierung — und entwickle skalierbare Anwendungen mit Python, LangChain und Cloud-Plattformen (GCP/AWS/Azure) über den gesamten ML-Lebenszyklus von der Datenverarbeitung über die Modellentwicklung bis zum Deployment und zur Optimierung.\n\nVor meinem Wechsel ins KI-Engineering habe ich über ein Jahrzehnt als Senior Data Analystin und Data Scientist gearbeitet und bringe starkes analytisches Denken und Geschäftsverständnis in das Design von KI-Systemen ein. Ich habe Mitarbeitende aus mehr als 30 Unternehmen in Datenanalyse geschult. Nach meinem Umzug nach Deutschland 2023 habe ich einen zweiten Masterabschluss in Data Science und ein intensives KI-Weiterbildungsprogramm abgeschlossen und fokussiere mich nun darauf, technische KI-Expertise mit echtem Geschäftsimpact zu verbinden.`,
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
                genai: "GenAI & LLM",
                software: "Softwareentwicklung",
                ml: "Machine Learning & Predictive Modeling",
                databases: "Datenbanken",
                cloud: "Cloud-Plattformen",
                statistics: "Statistik & Experimente",
                versioncontrol: "Versionskontrolle"
            },
            items: {
                genai: ["LLMs", "RAG", "Prompt Engineering", "Document Intelligence", "NLP-Pipelines", "Agentic Workflows (LangChain, n8n)", "Hugging Face", "OpenAI/Anthropic APIs", "Docker"],
                software: ["Python", "SQL", "C#", "FastAPI", "Clean Architecture"],
                ml: ["Überwachtes & unüberwachtes Lernen (Scikit-learn)", "Deep Learning (TensorFlow, PyTorch)", "Zeitreihenprognose", "Feature Engineering & Modellbewertung", "PySpark"],
                databases: ["pgvector", "Pinecone", "MS SQL Server", "BigQuery", "Snowflake"],
                cloud: ["AWS", "GCP", "Azure"],
                statistics: ["Regressionsanalyse", "Hypothesentests", "A/B-Tests"],
                versioncontrol: ["GitHub", "CI/CD"]
            }
        },
        experience: {
            title: "Berufserfahrung",
            jobs: [
                {
                    title: "KI-Ingenieurin / Data Scientist",
                    company: "Freiberuflich",
                    location: "Deutschland (Remote)",
                    period: "Okt 2024 – Heute",
                    type: "Freiberuflich",
                    description: "Entwicklung produktionsreifer LLM-, RAG- und NLP-Systeme von Anfang bis Ende für Kunden aus verschiedenen Branchen.\n\n• AI Content Automation Platform (Luninora GmbH): Konzeption und Bereitstellung einer LLM- und RAG-Plattform, die markenkonforme Marketinginhalte aus einer kuratierten Wissensdatenbank generiert – mit embedding-basiertem Retrieval zur kontextuellen Verankerung. Produktionszeit für Inhalte um 70 % reduziert (von ~4 Std. auf ~1 Std. pro Beitrag), Skalierung auf 200+ Assets/Monat ermöglicht und durch geringere Abhängigkeit von externem Copywriting geschätzte 2–3K €/Monat eingespart. Stack: Python, LangChain, OpenAI GPT-4o, pgvector, FastAPI, GCP Cloud Run.\n\n• LLM Document Intelligence zur KPI-Extraktion (Agile Insight): Durchgängiges System, das strukturierte HR-KPIs aus unstrukturierten PDFs extrahiert. ~500 Dokumente/Monat verarbeitet, manuelle Dateneingabe um 80 % reduziert (von ~20 auf ~4 Std./Woche) und ~95 % Genauigkeit auf Feldebene erreicht durch Prompt Engineering und Pydantic-Schemavalidierung mit Human-in-the-Loop-Prüfung. Stack: Python, LangChain, Azure Document Intelligence, GPT-4o, Streamlit.\n\n• RAG-basierter Chatbot für Unternehmensdokumente (Agile Insight): Kontextbewusster Chatbot, der Mitarbeitenden ermöglicht, interne Dokumente in natürlicher Sprache über semantische Suche in einem Vector Store abzufragen. 1000+ Dokumente indexiert, durchschnittliche Suchzeit von ~15 Min. auf unter 1 Min. reduziert und ~90 % Antwortrelevanz erreicht durch optimiertes Chunking, hybrides Retrieval und Source-Citation-Grounding zur Reduzierung von Halluzinationen. Stack: Agentic RAG, Python, LangChain, Firestore Vector Search, GPT-4o.\n\n• Customer-Churn-Vorhersagemodell (Wilhelm.tel): Überwachtes ML-Modell zur prädiktiven Bewertung des Abwanderungsrisikos für proaktive Kundenbindung. 92 % Recall erreicht, die 20 % Kunden mit dem höchsten Risiko identifiziert und die Abwanderung bei gefährdeten Kunden um rund 12 % reduziert. Stack: Python, scikit-learn, XGBoost, pandas, BigQuery.",
                    link: null
                },
                {
                    title: "KI / Cloud / ML — Intensives Weiterbildungsprogramm",
                    company: "Berufliche Weiterbildung",
                    location: "Potsdam, Deutschland",
                    period: "03/2024 – 09/2024",
                    type: "Berufliche Weiterbildung",
                    description: "- Deep-Learning-Zeitreihenmodelle zur Vorhersage der XRP- und Bitcoin-Kurse entwickelt, die Marktdaten mit der Sentiment-Analyse von Nachrichten- und Social-Media-Signalen kombinieren – 94 % Precision erreicht.\n- Masterarbeit zur Betrugserkennung bei Ethereum-Transaktionen abgeschlossen: Features aus On-Chain-Daten entwickelt und XGBoost trainiert, um betrügerische Transaktionen mit ~90 %+ Precision zu erkennen.\n- Durchgängiges KI-Capstone-Projekt umgesetzt: ein Modell trainiert und produktiv auf GCP Cloud Run mit Docker und FastAPI bereitgestellt – über den gesamten Lebenszyklus von der Datenaufbereitung bis zum Serving.",
                    link: null
                },
                {
                    title: "Data Scientist / Data Analyst Consultant",
                    company: "Darsoon",
                    location: "Ontario, Kanada (Remote)",
                    period: "01/2023 – 03/2024",
                    type: "Teilzeit",
                    description: "\n- Zusammenarbeit mit dem Produktteam bei einem E-Commerce-Analyseprojekt in der Pharmaindustrie. Dabei wurde festgestellt, dass Stammkunden 60 % des Gesamtumsatzes ausmachen – ein erhebliches Potenzial für loyalitätsorientierte Marketingstrategien.\n- Transformation von Google-Analytics- und OLTP-Daten mit dbt sowie Visualisierung der BigQuery-Daten.\n- Reduzierung der Personalkosten durch eine automatisierte Nachrichtenanalyse mit der Guardian Media Group API und Python zur Erkennung von Anomalien in Zeitreihen und Untersuchung ihrer Ursachen.\n- Mentoring von Junior Data Analysts in SQL, Python und Power BI.",
                    link: "https://darsoon.com/en"
                },
                {
                    title: "Senior Data Analyst",
                    company: "Favagostar",
                    location: "Teheran, Iran",
                    period: "03/2019 – 01/2023",
                    type: "Hybrid-Vollzeit",
                    description: "\n- Erhöhung der Wiederbuchungsrate um 48 % bei einem Home-Service-Anbieter durch datenbasierte Analysen und strategische Systemintegrationen, einschließlich A/B-Tests mit Power BI und Python sowie einer Rückgewinnungsstrategie für stornierte Termine.\n- Reduzierung der Projektprozesskosten um 32 % für ein Projektmanagementunternehmen im Gesundheitssektor durch Integration von Daten aus verschiedenen Quellen, Implementierung eines Sternschema-Data-Warehouses und Erstellung von Power-BI-Dashboards, die strategische Entscheidungen beeinflussten.\n- Definition relevanter KPIs in enger Zusammenarbeit mit Stakeholdern und Erstellung von Ad-hoc-Reports.\n- Schulung von Mitarbeitenden aus über 30 Unternehmen in Datenanalyse.",
                    link: "https://persiafava.com/"
                },
                {
                    title: "Lehrbeauftragte für Datenanalyse",
                    company: "Azad University",
                    location: "Teheran, Iran",
                    period: "01/2014 – 01/2019",
                    type: "Vollzeit",
                    description: "Vermittelte SQL Server, Excel und Python als Lehrbeauftragte für Datenanalyse.",
                    link: "https://qods.iau.ir/fa"
                },
                {
                    title: "Data Analystin",
                    company: "Mellat Bank",
                    location: "Teheran, Iran",
                    period: "12/2011 – 03/2014",
                    type: "Vollzeit",
                    description: "- Konzeption und Entwicklung von Dashboards zur Übersicht der Performance im Personal- und Einkaufsbereich sowie Mitwirkung an Abstimmungen mit Stakeholdern zur Ableitung relevanter KPIs.\n- Analyse von IT-Prozessen und Definition von KPIs auf Basis des COBIT-5-Frameworks zur Messung der Standardkonformität – ausgezeichnet für herausragende Projektleistungen.",
                    link: "https://bankmellat.ir/default.aspx"
                },
                {
                    title: "Full-stack Developer",
                    company: "Asan Software",
                    location: "Teheran, Iran",
                    period: "04/2010 – 11/2011",
                    type: "Vollzeit",
                    description: "- Entwicklung eines Gehaltsabrechnungssystems als C#-, WPF- und LINQ-Programmiererin.\n- Entwurf und Implementierung der SQL-Server-Datenbank.",
                    link: null
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
                    year: "2024"
                },
                {
                    degree: "Master of Science in Software Engineering",
                    school: "Science and Research University",
                    location: "Teheran, Iran",
                    year: "2013"
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

