export function getPersonalProjects() {
  return [
    {
      id: 1,
      title: "Portfolio Web Personal",
      description: "Sitio web personal desarrollado con Astro y Tailwind CSS para mostrar mi trabajo académico y proyectos.",
      technologies: ["Astro", "Tailwind CSS", "JavaScript", "Responsive Design"],
      features: [
        "Diseño adaptativo y modo oscuro",
        "Optimización SEO",
        "Integración con APIs externas"
      ],
      github: "https://github.com/username/personal-website",
      live: "https://example.com"
    },
    {
      id: 2,
      title: "Signal Processing Library",
      description: "Biblioteca de código abierto para el procesamiento de señales digitales, enfocada en aplicaciones biomédicas.",
      technologies: ["Python", "NumPy", "SciPy", "Matplotlib"],
      features: [
        "Filtros digitales personalizables",
        "Análisis espectral avanzado",
        "Visualización de señales en tiempo real"
      ],
      github: "https://github.com/username/signal-processing-lib",
      documentation: "https://docs.example.com/signal-lib"
    },
    {
      id: 3,
      title: "Medical Image Viewer",
      description: "Aplicación de escritorio para la visualización y análisis de imágenes médicas en formato DICOM.",
      technologies: ["Electron", "React", "Node.js", "DICOM.js"],
      features: [
        "Soporte para múltiples formatos de imagen médica",
        "Herramientas de medición y anotación",
        "Exportación de informes en PDF"
      ],
      github: "https://github.com/username/medical-viewer",
      download: "https://releases.example.com/medical-viewer"
    },
    {
      id: 4,
      title: "IoT Environmental Monitor",
      description: "Sistema de monitorización ambiental basado en ESP32 para uso doméstico y educativo.",
      technologies: ["ESP32", "C++", "MQTT", "InfluxDB", "Grafana"],
      features: [
        "Medición de temperatura, humedad y calidad del aire",
        "Dashboard en tiempo real",
        "Alertas configurables por email"
      ],
      github: "https://github.com/username/iot-monitor",
      tutorial: "https://blog.example.com/iot-monitor-tutorial"
    }
  ];
}