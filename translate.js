document.addEventListener("DOMContentLoaded", function () {
    const translations = {
        en: {
            "home": "Home",
            "location": "Location",
            "services": "Services",
            "team": "Meet Our Team",
            "book-now": "Book Now",
            "booking-confirmed": "Booking Confirmed!",
            "your-info": "Your Information",
            "continue-booking": "Continue Booking",
            "date": "Date:",
            "time": "Time:",
            "select-service": "Select a Service:",
            "therapist": "Therapist:",
            "appointment-number": "Appointment Number:",
            "appointment-details": "Booking Details",
            "reschedule-note": "If you need to reschedule or cancel, contact us at",
            "looking-forward": "We look forward to seeing you soon!"
        },
        fr: {
            "home": "Accueil",
            "location": "Localisation",
            "services": "Services",
            "team": "Notre Équipe",
            "book-now": "Réservez Maintenant",
            "booking-confirmed": "Réservation Confirmée!",
            "your-info": "Vos Informations",
            "continue-booking": "Continuer la Réservation",
            "date": "Date:",
            "time": "Heure:",
            "select-service": "Sélectionner un Service:",
            "therapist": "Thérapeute:",
            "appointment-number": "Numéro de Rendez-vous:",
            "appointment-details": "Détails de Réservation",
            "reschedule-note": "Si vous devez replanifier ou annuler, contactez-nous à",
            "looking-forward": "Nous avons hâte de vous voir bientôt!"
        }
    };

    let currentLang = "en"; // Default language

    const langToggle = document.getElementById("lang-toggle");

    langToggle.addEventListener("click", function () {
        currentLang = currentLang === "en" ? "fr" : "en"; // Toggle language
        updateLanguage();
    });

    function updateLanguage() {
        document.querySelectorAll("[data-translate]").forEach((element) => {
            const key = element.getAttribute("data-translate");
            element.textContent = translations[currentLang][key];
        });

        // Update button text
        langToggle.textContent = currentLang === "en" ? "🇬🇧 English" : "🇫🇷 Français";
    }
});
