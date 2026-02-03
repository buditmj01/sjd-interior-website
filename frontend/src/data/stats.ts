import { getSiteSettings } from '../lib/getSiteSettings';

// Fallback hardcoded stats data
const fallbackStatsData = {
    projectsCompleted: {
        value: "500+",
        label: "Proyek Selesai"
    },
    yearsExperience: {
        value: "12+",
        label: "Tahun Pengalaman"
    },
    clientSatisfaction: {
        value: "98%",
        label: "Klien Puas"
    },
    afterProjectSupport: {
        value: "90",
        label: "Hari After Project Support"
    }
};

// Fallback array for easy iteration
const fallbackStatsArray = [
    fallbackStatsData.projectsCompleted,
    fallbackStatsData.yearsExperience,
    fallbackStatsData.clientSatisfaction,
    fallbackStatsData.afterProjectSupport
];

// Fetch stats from CMS or use fallback
let statsArray = fallbackStatsArray;

try {
    const settings = await getSiteSettings();

    if (settings.stats && settings.stats.length > 0) {
        // Use CMS stats if available
        statsArray = settings.stats.map((stat: any) => ({
            value: stat.value,
            label: stat.label
        }));
    }
} catch (error) {
    console.warn('Failed to fetch stats from CMS, using fallback data:', error);
}

// Export stats array for components to use
export { statsArray };

// Export individual stats for backward compatibility
export const statsData = {
    projectsCompleted: statsArray[0] || fallbackStatsData.projectsCompleted,
    yearsExperience: statsArray[1] || fallbackStatsData.yearsExperience,
    clientSatisfaction: statsArray[2] || fallbackStatsData.clientSatisfaction,
    afterProjectSupport: statsArray[3] || fallbackStatsData.afterProjectSupport
};
