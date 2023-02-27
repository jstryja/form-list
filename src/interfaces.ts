export interface FirmInterface {
    title?: string;
    street?: string;
    city?: string;
    person?: string;
    phone?: string;
    email?: string;
}

export interface ProfessionInterface {
    profession: string;
    firms: FirmInterface[];
}

export interface RowInterface {
    profession: string;
    title?: string;
    street?: string;
    city?: string;
    person?: string;
    phone?: string;
    email?: string;
}

export const mapDataToProfessions = (data: RowInterface[]): ProfessionInterface[] => {
    const professions: ProfessionInterface[] = [];
    const professionMap = new Map();

    for (const firm of data) {
        const profession = firm.profession;
        const firmInfo = {
            title: firm.title,
            street: firm.street,
            city: firm.city,
            person: firm.person,
            phone: firm.phone,
            email: firm.email,
        };

        if (!professionMap.has(profession)) {
            const professionObj = { profession: profession, firms: [firmInfo] };
            professions.push(professionObj);
            professionMap.set(profession, professionObj);
        } else {
            const professionObj = professionMap.get(profession);
            professionObj.firms.push(firmInfo);
        }
    }

    return professions;
};

export interface FormValues {
    sendDate: string;
    title: string;
    estimateDate: string;
    place: string;
    deadlineDate: string;
    workType: { [key: string]: string };
    template: Buffer;
}

// export const mapDataToProfessions = (data: RowInterface[]): ProfessionInterface[] => {
//     const professions: ProfessionInterface[] = [];
//     data.map((row) => {
//         const currentProfession = professions.find((p) => p.profession === row.profession);
//         // @ts-ignore
//         if (!currentProfession) {
//             professions.push({
//                 profession: row.profession,
//                 firms: [{
//                     title: row.title,
//                     street: row.street,
//                     city: row.city,
//                     person: row.person,
//                     phone: row.phone,
//                     email: row.email,
//                 }]
//             })
//         } else {
//             // @ts-ignore
//             currentProfession = {
//                 title: row.title
//             }
//         }
//     })
// }

// const data = [{
//     profession: 'a',
//     title: 'Nazev firmy',
//     city: 'sidlo',
// }, {
//     profession: 'a',
//     title: 'Jiny nazeb firmy',
//     city: 'Dalsi sidlo',
// }, {
//     profession: 'b',
//     title: 'Jeste jinyt nazeb firmy',
//     city: 'Dalsi sidlo 2',
// }]
//
// const professions = [{
//     profession: 'a',
//     firms: [{
//         title: 'Nazev firmy',
//         city: 'sidlo',
//     }, {
//         title: 'Jiny nazeb firmy',
//         city: 'Dalsi sidlo',
//     }]
// }, {
//     profession: 'b',
//     firms: [{
//         title: 'Jeste jinyt nazeb firmy',
//         city: 'Dalsi sidlo 2',
//     }]
// }]
