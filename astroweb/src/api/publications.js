export function getPublications() {
  return [
    {
      id: 1,
      title: "Deep Learning Approaches for Biomedical Signal Processing: A Comprehensive Review",
      authors: ["Sánchez-Reolid, R.", "García, A.", "Martínez, M.", "López, J."],
      journal: "IEEE Transactions on Biomedical Engineering",
      year: 2024,
      volume: "71",
      issue: "2",
      pages: "423-438",
      doi: "10.1109/TBME.2023.1234567",
      abstract: "Este artículo presenta una revisión exhaustiva de las técnicas de deep learning aplicadas al procesamiento de señales biomédicas, con énfasis en electrocardiogramas y electroencefalogramas.",
      keywords: ["Deep Learning", "Signal Processing", "Biomedical Engineering", "Neural Networks"],
      citations: 15,
      type: "journal"
    },
    {
      id: 2,
      title: "Real-time ECG Analysis Using Convolutional Neural Networks",
      authors: ["Sánchez-Reolid, R.", "Fernández, E.", "González, C."],
      conference: "International Conference on Biomedical Engineering (ICBE)",
      location: "Barcelona, Spain",
      year: 2023,
      pages: "156-163",
      doi: "10.1145/3456789.0123456",
      abstract: "Presentamos un nuevo enfoque para el análisis de ECG en tiempo real utilizando redes neuronales convolucionales, logrando una precisión del 98% en la detección de arritmias.",
      keywords: ["ECG Analysis", "CNN", "Real-time Processing", "Arrhythmia Detection"],
      type: "conference"
    },
    {
      id: 3,
      title: "IoT-based Environmental Monitoring System for Industrial Applications",
      authors: ["Sánchez-Reolid, R.", "Martínez, A.", "López, P.", "García, M."],
      journal: "Sensors",
      year: 2023,
      volume: "23",
      issue: "4",
      pages: "1023-1038",
      doi: "10.3390/s23041023",
      abstract: "Desarrollo e implementación de un sistema de monitorización ambiental basado en IoT para entornos industriales, utilizando una red de sensores inalámbricos y procesamiento en la nube.",
      keywords: ["IoT", "Environmental Monitoring", "Wireless Sensor Networks", "Cloud Computing"],
      citations: 8,
      type: "journal"
    },
    {
      id: 4,
      title: "Advanced Signal Processing Techniques for Medical Image Analysis",
      authors: ["Sánchez-Reolid, R.", "Pérez, L."],
      journal: "Medical Image Analysis",
      year: 2023,
      volume: "45",
      issue: "3",
      pages: "89-102",
      doi: "10.1016/j.media.2023.567890",
      abstract: "Investigación sobre nuevas técnicas de procesamiento de señales para el análisis de imágenes médicas, incluyendo métodos de segmentación y clasificación basados en deep learning.",
      keywords: ["Medical Imaging", "Signal Processing", "Image Segmentation", "Classification"],
      citations: 12,
      type: "journal"
    },
    {
      id: 5,
      title: "Machine Learning for Predictive Maintenance in Industrial IoT Systems",
      authors: ["Sánchez-Reolid, R.", "Torres, J.", "Ruiz, A."],
      conference: "IEEE International Conference on Industrial Technology (ICIT)",
      location: "Valencia, Spain",
      year: 2023,
      pages: "234-241",
      doi: "10.1109/ICIT.2023.987654",
      abstract: "Propuesta de un sistema de mantenimiento predictivo basado en machine learning para sistemas IoT industriales, con validación en casos de uso reales.",
      keywords: ["Predictive Maintenance", "Machine Learning", "Industrial IoT", "Industry 4.0"],
      type: "conference"
    }
  ];
}