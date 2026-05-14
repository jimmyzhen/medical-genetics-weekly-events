const OnCallServiceStaff = {
    attendingPhysicians: [
        { lastname: 'Bachir', firstname: 'Suha' },
        { lastname: 'Bernstein', firstname: 'Jon' },
        { lastname: 'Enns', firstname: 'Gregory' },
        { lastname: 'Gomez-Ospina', firstname: 'Natalia' },
        { lastname: 'Lee', firstname: 'Chung' },
        { lastname: 'Manning', firstname: 'Melanie' },
        { lastname: 'Matalon', firstname: 'Dena' },
        { lastname: 'Stevenson', firstname: 'David' },
        { lastname: 'Tise', firstname: 'Christy' },
    ],
    residents: [
        { lastname: 'Carter', firstname: 'Christopher' },
        { lastname: 'Ebuen', firstname: 'Mariz' },
        { lastname: 'Gilitwala', firstname: 'Zainab' },
        { lastname: 'Luz', firstname: 'Danielle' },
        { lastname: 'Banerji', firstname: 'Sarah' },
        { lastname: 'Chilakamarri', firstname: 'Lekha' },
        { lastname: 'Juan', firstname: 'Aimee' },
        { lastname: 'Keehan', firstname: 'Laura' },
        { lastname: 'Onaigui', firstname: 'Kristine' },
        { lastname: 'Pierce', firstname: 'Corina' },
        { lastname: 'Valientes', firstname: 'David' },
    ],
    get ertProvider() {
        return [...this.attendingPhysicians, { lastname: 'Bernal', firstname: 'Holly' }];
    },
    nutritionists: [
        { lastname: 'Bell', firstname: 'Lauren' },
        { lastname: 'Pedro', firstname: 'Temitope' },
        { lastname: 'Wright', firstname: 'Jodi' },
    ],
    geneticCounselors: [
        { lastname: 'Bonner', firstname: 'Devon' },
        { lastname: 'Calderwood', firstname: 'Laurel' },
        { lastname: 'Dunleavy', firstname: 'Brooke' },
        { lastname: 'Dykzeul', firstname: 'Natalie' },
        { lastname: 'Farrelly', firstname: 'Ellyn' },
        { lastname: 'Hanson-Kahn', firstname: 'Andrea' },
        { lastname: 'Ho', firstname: 'Wesley' },
        { lastname: 'Kim', firstname: 'Jennifer' },
        { lastname: 'Phung', firstname: 'Brenden' },
        { lastname: 'Schelley', firstname: 'Susan' },
        { lastname: 'Silva', firstname: 'Caitlin' },
    ],
};

export default OnCallServiceStaff;
