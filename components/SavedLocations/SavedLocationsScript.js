//SavedLocationsScript.js

import { ref, onMounted, onUnmounted } from 'vue';
import { useLocationStore } from '@/stores/LocationStore'


export default {

    name: 'SavedLocations',
    props: {
        history: {
            type: Array,
            default: () => []
        },
        useImperialUnits: {
            type: Boolean,
            default: false
        }
    },
    emits: ['select', 'remove', 'refresh-location'],

    setup() {
        const activeDropdown = ref(null);
        const locationStore = useLocationStore()


        // Toggle dropdown menu
        const toggleDropdown = (id) => {
            if (activeDropdown.value === id) {
                activeDropdown.value = null;
            } else {
                activeDropdown.value = id;
            }
        };

        const handleRemove = (locationId) => {
            locationStore.removeLocation(locationId)
        }


        // Close dropdown
        const closeDropdown = () => {
            activeDropdown.value = null;
        };

        // Global click handler to close dropdowns
        const handleGlobalClick = (e) => {
            if (!e.target.closest('.menu-button') && !e.target.closest('.dropdown-menu')) {
                closeDropdown();
            }
        };

        // Format temperature in Celsius
        const formatTempC = (temp) => {
            return temp ? `${Math.round(temp)}°C` : 'N/A';
        };

        // Format temperature in Fahrenheit
        const formatTempF = (temp) => {
            return temp ? `${Math.round((temp * 9/5) + 32)}°F` : 'N/A';
        };

        // Get weather icon URL
        const getWeatherIconUrl = (iconCode) => {
            return iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';
        };

        // Lifecycle hooks
        onMounted(() => {
            if (typeof window !== 'undefined') {
                window.addEventListener('click', handleGlobalClick);
            }
        });

        onUnmounted(() => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('click', handleGlobalClick);
            }
        });

        // Return all reactive data and methods that the template needs
        return {
            activeDropdown,
            toggleDropdown,
            closeDropdown,
            formatTempC,
            formatTempF,
            getWeatherIconUrl,
            handleRemove,
            locationStore
        };
    }
};