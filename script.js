const { createApp } = Vue;

createApp({

    data() {
        return {
            form: {
                fullName: '',
                dateOfBirth: '',
                gender: '',
                totalVisitors: null,
                totalChildren: null,
                accommodation: '',
                cardholderName: '',
                cardNumber: '',
                expirationDate: '',
                cvv: ''
            },
            
            errors: {},
            generalError: '',
            
            places: [],
            isLoadingPlaces: false,
            placesError: '',
            selectedPlaces: [],
            
            accommodationOptions: [
                'No accommodation needed',
                'Forest View Hotel',
                'Totoro Family Inn',
                'Witch Valley Guesthouse',
                'Luxury Ghibli Resort'
            ],
            
            showSummary: false
        };
    },


    computed: {
        maskedCardNumber() {
            const cleanNumber = this.form.cardNumber.replace(/\s/g, '');
            const lastFour = cleanNumber.slice(-4);
            return `**** **** **** ${lastFour}`;
        }
    },
    


    mounted() {
        this.loadPlaces();
    },
    
    methods: {
        async loadPlaces() {
            this.isLoadingPlaces = true;
            this.placesError = '';
            
            try {
                const response = await fetch('ghibli_park.json');
                if (!response.ok) {
                    throw new Error('Failed to load JSON file');
                }
                this.places = await response.json();
                
                if (this.places.length === 0) {
                    this.places = this.getFallbackData();
                }
                
                this.isLoadingPlaces = false;
            } catch (error) {
                console.error('Error loading places from file:', error);
                this.places = this.getFallbackData();
                this.isLoadingPlaces = false;
            }
        },
        

        togglePlace(place) {
            const index = this.selectedPlaces.findIndex(p => p.id === place.id);
            
            if (index !== -1) {
                this.selectedPlaces.splice(index, 1);
            } else {
                this.selectedPlaces.push(place);
            }
        },
        
        isPlaceSelected(place) {
            return this.selectedPlaces.some(p => p.id === place.id);
        },
        
        generateItinerary() {
            this.clearErrors();
            this.showSummary = false;
            
            if (this.validateForm()) {
                this.showSummary = true;
                setTimeout(() => {
                    document.querySelector('.summary-section').scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                this.generalError = 'There are mandatory items pending to be filled. Please complete the required fields.';
            }
        },
        


        validateForm() {
            let isValid = true;
            
            if (!this.form.fullName.trim()) {
                this.errors.fullName = 'Full name is required';
                isValid = false;
            }
            
            if (!this.form.dateOfBirth) {
                this.errors.dateOfBirth = 'Date of birth is required';
                isValid = false;
            }
            
            if (!this.form.gender) {
                this.errors.gender = 'Please select your gender';
                isValid = false;
            }
            
            if (this.selectedPlaces.length === 0) {
                this.errors.selectedPlaces = 'Please select at least one Ghibli Park place.';
                isValid = false;
            }
            
            if (!this.form.totalVisitors || this.form.totalVisitors < 1) {
                this.errors.totalVisitors = 'Please enter a valid number of visitors (minimum 1)';
                isValid = false;
            }
            

            if (this.form.totalChildren === null || this.form.totalChildren < 0) {
                this.errors.totalChildren = 'Please enter a valid number of children (minimum 0)';
                isValid = false;
            }
            
            if (!this.form.accommodation) {
                this.errors.accommodation = 'Please select an accommodation option';
                isValid = false;
            }
            
            if (!this.form.cardholderName.trim()) {
                this.errors.cardholderName = 'Cardholder name is required';
                isValid = false;
            }
            
            if (!this.form.cardNumber.trim()) {
                this.errors.cardNumber = 'Card number is required';
                isValid = false;
            }
            
            if (!this.form.expirationDate) {
                this.errors.expirationDate = 'Expiration date is required';
                isValid = false;
            }
            
            if (!this.form.cvv.trim()) {
                this.errors.cvv = 'CVC is required';
                isValid = false;
            }
            
            return isValid;
        },
        
        clearErrors() {
            this.errors = {};
            this.generalError = '';
        }

    }
}).mount('#app');