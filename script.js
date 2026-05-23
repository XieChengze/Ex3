// 创建Vue应用实例
const { createApp } = Vue;

createApp({
    // 响应式数据
    data() {
        return {
            // 表单数据对象
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
            
            // 表单验证错误信息
            errors: {},
            generalError: '',
            
            // 公园景点数据
            places: [],
            isLoadingPlaces: false, // 加载状态标志
            placesError: '', // 景点加载错误信息
            selectedPlaces: [], // 用户选中的景点数组
            
            // 住宿选项数组
            accommodationOptions: [
                'No accommodation needed',
                'Forest View Hotel',
                'Totoro Family Inn',
                'Witch Valley Guesthouse',
                'Luxury Ghibli Resort'
            ],
            
            // 是否显示行程摘要
            showSummary: false
        };
    },
    
    // 组件挂载后执行
    mounted() {
        this.loadPlaces();
    },
    
    // 方法定义
    methods: {
        /**
         * 异步加载公园景点数据
         * 优先从本地JSON文件加载，失败则使用备用数据
         */
        async loadPlaces() {
            this.isLoadingPlaces = true;
            this.placesError = '';
            
            try {
                // 从本地JSON文件加载数据
                const response = await fetch('ghibli_park.json');
                if (!response.ok) {
                    throw new Error('Failed to load JSON file');
                }
                this.places = await response.json();
                
                // 如果JSON文件为空，使用备用数据
                if (this.places.length === 0) {
                    this.places = this.getFallbackData();
                }
                
                this.isLoadingPlaces = false;
            } catch (error) {
                console.error('Error loading places from file:', error);
                // 加载失败时使用硬编码的备用数据
                this.places = this.getFallbackData();
                this.isLoadingPlaces = false;
            }
        },
        
        /**
         * 获取备用景点数据
         * 当本地JSON文件加载失败时使用
         * @returns {Array} 完整的吉卜力公园景点数据
         */
        getFallbackData() {
            return [
                {
                    "id": "gwh1",
                    "name": "Central Stairs",
                    "image": "assets/gwh1.jpg",
                    "description": "A brilliant mosaic tile staircase connecting first and second floors."
                },
                {
                    "id": "gwh2",
                    "name": "Open Warehouse",
                    "image": "assets/gwh2.jpg",
                    "description": "Contains production artifacts and sculptures from past exhibits in Japan and abroad"
                },
                {
                    "id": "gwh3",
                    "name": "No-Face",
                    "image": "assets/gwh3.jpg",
                    "description": "Part of interactive exhibits,where you can become your favorite Studio Ghibli characters."
                },
                {
                    "id": "gwh4",
                    "name": "Ghibli Meals",
                    "image": "assets/gwh4.jpg",
                    "description": "Why does the food in Studio Ghibli films look so delicious!? Those secrets are revealed here."
                },
                {
                    "id": "gwh5",
                    "name": "Ghibli Posters",
                    "image": "assets/gwh5.jpg",
                    "description": "A collection of Studio Ghibli posters, film and music packagings, books and more, all in one place"
                },
                {
                    "id": "gwh6",
                    "name": "Screening Room Cinema Orion",
                    "image": "assets/gwh6.jpg",
                    "description": "Seating about 170 people, Orion screens Studio Ghibli animated-shorts."
                },
                {
                    "id": "gwh7",
                    "name": "Director's Office",
                    "image": "assets/gwh7.jpg",
                    "description": "Yubaba from 'Spirited Away' is busy at work."
                },
                {
                    "id": "gwh8",
                    "name": "Catbus Room",
                    "image": "assets/gwh8.jpg",
                    "description": "In the play area that recreates the world of My Neighbor Totoro, a one-of-a-kind Cat Bus awaits."
                },
                {
                    "id": "gwh9",
                    "name": "Children's Town",
                    "image": "assets/gwh9.jpg",
                    "description": "This area is a mini-replica of the Higashi-Koganei Station area in Tokyo where Studio Ghibli is located."
                },
                {
                    "id": "gwh10",
                    "name": "Garden in the Sky",
                    "image": "assets/gwh10.jpg",
                    "description": "Robot Soldiers, from Castle in the Sky, wait patiently for their master to return."
                },
                {
                    "id": "gwh11",
                    "name": "The House Below and the Little People's Garden",
                    "image": "assets/gwh11.jpg",
                    "description": "The house where the main character Arrietty and her family live and the surrounding garden."
                },
                {
                    "id": "gwh12",
                    "name": "Shop 'Adventurous Flying Squadron'",
                    "image": "assets/gwh12.jpg",
                    "description": "Sells items from all Studio Ghibli productions as well as original Ghibli Park items."
                },
                {
                    "id": "gwh13",
                    "name": "Transcontinental Flight Cafe",
                    "image": "assets/gwh13.jpg",
                    "description": "The café has a line-up of sandwiches, pizzas, etc."
                },
                {
                    "id": "hoy1",
                    "name": "Elevator Tower",
                    "image": "assets/hoy1.jpg",
                    "description": "A late 19th century sci-fi architecture that appears in 'Castle in the Sky' and 'Howl's Moving Castle'."
                },
                {
                    "id": "hoy2",
                    "name": "World Emporium",
                    "image": "assets/hoy2.jpg",
                    "description": "Antique repair and resale shop from 'Whisper of the Heart'."
                },
                {
                    "id": "hoy3",
                    "name": "The Cat Bureau",
                    "image": "assets/hoy3.jpg",
                    "description": "From 'The Cat Returns', this is a cat-sized single-storey wooden building."
                },
                {
                    "id": "hoy4",
                    "name": "The Rotary",
                    "image": "assets/hoy4.jpg",
                    "description": "A roundabout like the one in the town square from 'Whisper of the Heart'."
                },
                {
                    "id": "df1",
                    "name": "Satsuki and Mei's House",
                    "image": "assets/df1.jpg",
                    "description": "This is the Japanese-Western style house Satsuki and Mei moved to in 'My Neighbor Totoro'."
                },
                {
                    "id": "df2",
                    "name": "Dondoko-do",
                    "image": "assets/df2.jpg",
                    "description": "A 5-meter-tall wooden play equipment where children of twelve years and under can play inside."
                },
                {
                    "id": "df3",
                    "name": "Dondoko Shop",
                    "image": "assets/df3.jpg",
                    "description": "Keychains, amulet pouches and original Dondoko Forest souvenirs are available for purchase in this shop."
                },
                {
                    "id": "df4",
                    "name": "Dondoko-Dokoro",
                    "image": "assets/df4.jpg",
                    "description": "Sells drinks, souvenirs and seasonal items."
                },
                {
                    "id": "df5",
                    "name": "Dondoko-go",
                    "image": "assets/df5.jpg",
                    "description": "The slope car connects the ground level to the peak of the Dondoko Forest hill."
                },
                {
                    "id": "mv1",
                    "name": "Tatara-ba",
                    "image": "assets/mv1.jpg",
                    "description": "This is a hands-on learning center designed to look like a building in 'Princess Mononoke'."
                },
                {
                    "id": "mv2",
                    "name": "Charcoal-grilled Gohei-Mochi Cooking Experience",
                    "image": "assets/mv2.jpg",
                    "description": "Add your preferred sauce and cook this beloved local snack yourself over a traditional charcoal grill."
                },
                {
                    "id": "mv3",
                    "name": "Stone-milled Kinako Grinding Experience",
                    "image": "assets/mv3.jpg",
                    "description": "Learn the traditional way of making kinako (soybean flour) using a stone mill."
                },
                {
                    "id": "mv4",
                    "name": "Lord Okkoto",
                    "image": "assets/mv4.jpg",
                    "description": "This is a slide based on the character Lord Okkoto from 'Princess Mononoke'."
                },
                {
                    "id": "mv5",
                    "name": "Demon Spirit",
                    "image": "assets/mv5.jpg",
                    "description": "This structure is based on the Demon Spirit from 'Princess Mononoke'."
                },
                {
                    "id": "mv6",
                    "name": "Mononoke Village Rest Stop",
                    "image": "assets/mv6.jpg",
                    "description": "The rest stop shop sells original items as well as refreshments to help you relax and recharge."
                },
                {
                    "id": "vow1",
                    "name": "The Mouth of the Witch",
                    "image": "assets/vow1.jpg",
                    "description": "At the entrance of Valley of Witches, this structure is inspired by the witch Bella Yaga from Earwig and the Witch."
                },
                {
                    "id": "vow2",
                    "name": "Okino Residence",
                    "image": "assets/vow2.jpg",
                    "description": "This is a two-storey house where Kiki, the main character from 'Kiki's Delivery Service', lives."
                },
                {
                    "id": "vow3",
                    "name": "Guchokipanya Bakery",
                    "image": "assets/vow3.jpg",
                    "description": "The bakery where the main character Kiki and her black cat Jiji from 'Kiki's Delivery Service' live."
                },
                {
                    "id": "vow4",
                    "name": "Howl's Castle",
                    "image": "assets/vow4.jpg",
                    "description": "About 20-meters-tall, this is the castle with creature-like features from 'Howl's Moving Castle'."
                },
                {
                    "id": "vow5",
                    "name": "Hatter's Millinery",
                    "image": "assets/vow5.jpg",
                    "description": "This is the two-storey hat shop that Sophie, the main character from 'Howl's Moving Castle', manages."
                },
                {
                    "id": "vow6",
                    "name": "The House of Witches",
                    "image": "assets/vow6.jpg",
                    "description": "This house is where Earwig, the main character from 'Earwig and the Witch', was taken to live."
                },
                {
                    "id": "vow7",
                    "name": "Carousel",
                    "image": "assets/vow7.jpg",
                    "description": "This is a ride for children imagined as one from a traveling fair that comes to the village once a year."
                },
                {
                    "id": "vow8",
                    "name": "Flying Machine",
                    "image": "assets/vow8.jpg",
                    "description": "This is a ride for children imagined as one from a traveling fair that comes to the village once a year."
                },
                {
                    "id": "vow9",
                    "name": "Lift for Witches",
                    "image": "assets/vow9.jpg",
                    "description": "This elevator goes up to the second floor of Guchokipanya Bakery and Hatter's Millinery."
                },
                {
                    "id": "vow10",
                    "name": "Flying Oven",
                    "image": "assets/vow10.jpg",
                    "description": "A restaurant with an impressive brick exterior is located near the entrance to the Valley of Witches."
                },
                {
                    "id": "vow11",
                    "name": "Witch Coven 13",
                    "image": "assets/vow11.jpg",
                    "description": "This shop has a variety of original Valley of Witches items."
                }
            ];
        },
        
        /**
         * 切换景点的选中状态
         * @param {Object} place - 要切换的景点对象
         */
        togglePlace(place) {
            const index = this.selectedPlaces.findIndex(p => p.id === place.id);
            
            if (index !== -1) {
                // 如果已选中，则取消选择
                this.selectedPlaces.splice(index, 1);
            } else {
                // 如果未选中，则添加到选中列表
                this.selectedPlaces.push(place);
            }
        },
        
        /**
         * 检查景点是否已被选中
         * @param {Object} place - 要检查的景点对象
         * @returns {Boolean} 是否选中
         */
        isPlaceSelected(place) {
            return this.selectedPlaces.some(p => p.id === place.id);
        },
        
        /**
         * 生成行程按钮点击事件处理
         * 先清除错误，再验证表单，验证通过则显示摘要
         */
        generateItinerary() {
            this.clearErrors();
            this.showSummary = false;
            
            if (this.validateForm()) {
                this.showSummary = true;
                // 平滑滚动到摘要部分
                setTimeout(() => {
                    document.querySelector('.summary-section').scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                this.generalError = 'There are mandatory items pending to be filled. Please complete the required fields.';
            }
        },
        
        /**
         * 表单验证方法
         * 检查所有必填字段是否已填写
         * @returns {Boolean} 表单是否验证通过
         */
        validateForm() {
            let isValid = true;
            
            // 验证个人信息
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
            
            // 验证景点选择
            if (this.selectedPlaces.length === 0) {
                this.errors.selectedPlaces = 'Please select at least one Ghibli Park place.';
                isValid = false;
            }
            
            // 验证游客详情
            if (!this.form.totalVisitors || this.form.totalVisitors < 1) {
                this.errors.totalVisitors = 'Please enter a valid number of visitors (minimum 1)';
                isValid = false;
            }
            
            if (this.form.totalChildren === null || this.form.totalChildren < 0) {
                this.errors.totalChildren = 'Please enter a valid number of children (minimum 0)';
                isValid = false;
            }
            
            // 验证住宿选择
            if (!this.form.accommodation) {
                this.errors.accommodation = 'Please select an accommodation option';
                isValid = false;
            }
            
            // 验证支付详情
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
        
        /**
         * 清除所有错误信息
         * 在每次提交表单前调用
         */
        clearErrors() {
            this.errors = {};
            this.generalError = '';
        }
    }
}).mount('#app');