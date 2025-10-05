<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEO-LOGS • КИБЕРПАНК ПАНЕЛЬ</title>
    
    <!-- Библиотеки для максимализма -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
        /* 🔥 НОВАЯ КИБЕРПАНК СИСТЕМА СТИЛЕЙ */
        :root {
            --bg-primary: #0a0a16;
            --bg-secondary: #151528;
            --bg-card: #1e1e3a;
            --accent-primary: #8b5ceb;
            --accent-secondary: #00d4ff;
            --accent-tertiary: #ff2a6d;
            --text-primary: #ffffff;
            --text-secondary: #a0a0c0;
            --text-glow: 0 0 10px currentColor;
            --danger: #ff3860;
            --warning: #ffdd57;
            --success: #23d160;
            --neon-shadow: 0 0 20px rgba(139, 92, 235, 0.3);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(135deg, var(--bg-primary) 0%, #1a1a2e 50%, #16213e 100%);
            color: var(--text-primary);
            font-family: 'Exo 2', sans-serif;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        /* 🌌 Анимированный фон с частицами */
        #particles-js {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
        }

        /* 🎮 Главный контейнер */
        .cyber-container {
            max-width: 1800px;
            margin: 0 auto;
            padding: 20px;
            position: relative;
        }

        /* 🚀 Хедер с анимацией */
        .cyber-header {
            text-align: center;
            padding: 40px 0;
            position: relative;
            margin-bottom: 40px;
        }

        .cyber-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 3px;
            background: linear-gradient(90deg, transparent, var(--accent-primary), var(--accent-secondary), transparent);
            animation: scanLine 3s linear infinite;
        }

        @keyframes scanLine {
            0% { width: 0; opacity: 0; }
            50% { width: 200px; opacity: 1; }
            100% { width: 0; opacity: 0; left: calc(50% + 100px); }
        }

        .main-title {
            font-family: 'Orbitron', monospace;
            font-size: 4rem;
            font-weight: 900;
            background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(139, 92, 235, 0.5);
            margin-bottom: 10px;
            letter-spacing: 3px;
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .subtitle {
            font-family: 'Rajdhani', sans-serif;
            font-size: 1.5rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 4px;
        }

        /* 🎛️ Сетка контента */
        .cyber-grid {
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 30px;
            align-items: start;
        }

        /* 🎚️ Боковая панель фильтров */
        .cyber-filters {
            background: rgba(30, 30, 58, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(139, 92, 235, 0.3);
            border-radius: 20px;
            padding: 25px;
            box-shadow: var(--neon-shadow);
            position: sticky;
            top: 20px;
            transform-style: preserve-3d;
            transition: all 0.3s ease;
        }

        .cyber-filters:hover {
            transform: translateY(-5px) rotateX(5deg);
            box-shadow: 0 15px 30px rgba(139, 92, 235, 0.4);
        }

        .filters-header {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(139, 92, 235, 0.3);
        }

        .filters-header i {
            font-size: 1.5rem;
            margin-right: 10px;
            color: var(--accent-primary);
        }

        .filter-group {
            margin-bottom: 25px;
            position: relative;
        }

        .filter-label {
            display: block;
            margin-bottom: 8px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.9rem;
        }

        .cyber-input {
            width: 100%;
            padding: 12px 15px;
            background: rgba(10, 10, 22, 0.6);
            border: 1px solid rgba(139, 92, 235, 0.2);
            border-radius: 10px;
            color: var(--text-primary);
            font-family: 'Exo 2', sans-serif;
            transition: all 0.3s ease;
        }

        .cyber-input:focus {
            outline: none;
            border-color: var(--accent-primary);
            box-shadow: 0 0 15px rgba(139, 92, 235, 0.3);
        }

        .cyber-btn-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 30px;
        }

        .cyber-btn {
            padding: 14px 20px;
            border: none;
            border-radius: 10px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .cyber-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
        }

        .cyber-btn:hover::before {
            left: 100%;
        }

        .cyber-btn-primary {
            background: linear-gradient(135deg, var(--accent-primary), #6a42c4);
            color: white;
            box-shadow: 0 5px 15px rgba(139, 92, 235, 0.4);
        }

        .cyber-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 92, 235, 0.6);
        }

        .cyber-btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-secondary);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cyber-btn-secondary:hover {
            background: rgba(255, 255, 255, 0.15);
            color: var(--text-primary);
        }

        /* 📊 Основная область контента */
        .cyber-main {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }

        /* 🎪 Карточки статистики */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .cyber-stat-card {
            background: linear-gradient(135deg, rgba(30, 30, 58, 0.8), rgba(42, 42, 72, 0.8));
            backdrop-filter: blur(10px);
            border: 1px solid rgba(139, 92, 235, 0.2);
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .cyber-stat-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(139, 92, 235, 0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .cyber-stat-card:hover::before {
            opacity: 1;
        }

        .cyber-stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(139, 92, 235, 0.3);
        }

        .stat-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
            opacity: 0.8;
        }

        .stat-value {
            font-family: 'Orbitron', monospace;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 5px;
            background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .stat-label {
            font-family: 'Rajdhani', sans-serif;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.9rem;
        }

        /* 📜 Лента логов */
        .cyber-logs-container {
            background: rgba(30, 30, 58, 0.6);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(139, 92, 235, 0.3);
            border-radius: 20px;
            padding: 30px;
            box-shadow: var(--neon-shadow);
        }

        .logs-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid rgba(139, 92, 235, 0.3);
        }

        .logs-title {
            font-family: 'Orbitron', monospace;
            font-size: 1.8rem;
            background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .live-indicator {
            display: flex;
            align-items: center;
            background: rgba(255, 42, 109, 0.2);
            padding: 8px 15px;
            border-radius: 20px;
            border: 1px solid var(--accent-tertiary);
        }

        .pulse-dot {
            width: 10px;
            height: 10px;
            background: var(--accent-tertiary);
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 42, 109, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 42, 109, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 42, 109, 0); }
        }

        /* 🎴 Карточки логов */
        .cyber-logs-feed {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-height: 600px;
            overflow-y: auto;
            padding-right: 10px;
        }

        .cyber-logs-feed::-webkit-scrollbar {
            width: 8px;
        }

        .cyber-logs-feed::-webkit-scrollbar-track {
            background: rgba(10, 10, 22, 0.3);
            border-radius: 10px;
        }

        .cyber-logs-feed::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
            border-radius: 10px;
        }

        .cyber-log-entry {
            background: linear-gradient(135deg, rgba(42, 42, 72, 0.6), rgba(30, 30, 58, 0.8));
            border: 1px solid rgba(139, 92, 235, 0.2);
            border-radius: 15px;
            padding: 20px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            animation: slideIn 0.5s ease forwards;
            opacity: 0;
            transform: translateX(-20px);
        }

        @keyframes slideIn {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .cyber-log-entry::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 235, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .cyber-log-entry:hover::before {
            left: 100%;
        }

        .cyber-log-entry:hover {
            transform: translateY(-3px) scale(1.02);
            border-color: rgba(139, 92, 235, 0.5);
            box-shadow: 0 8px 25px rgba(139, 92, 235, 0.2);
        }

        .log-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }

        .log-category {
            display: inline-flex;
            align-items: center;
            padding: 6px 12px;
            border-radius: 20px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-right: 10px;
        }

        .log-player {
            font-family: 'Orbitron', monospace;
            font-weight: 700;
            font-size: 1.1rem;
            background: linear-gradient(45deg, var(--accent-secondary), #00a8cc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .log-amount {
            font-family: 'Orbitron', monospace;
            font-weight: 700;
            font-size: 1.2rem;
        }

        .log-amount.negative {
            color: var(--danger);
            text-shadow: var(--text-glow);
        }

        .log-meta {
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-bottom: 10px;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }

        .log-description {
            font-size: 0.95rem;
            line-height: 1.5;
            padding: 12px;
            background: rgba(10, 10, 22, 0.4);
            border-radius: 8px;
            border-left: 3px solid var(--accent-primary);
        }

        /* 🔄 Пагинация */
        .cyber-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-top: 30px;
        }

        .cyber-page-btn {
            padding: 12px 20px;
            background: rgba(139, 92, 235, 0.2);
            border: 1px solid var(--accent-primary);
            border-radius: 8px;
            color: var(--text-primary);
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 600;
        }

        .cyber-page-btn:hover {
            background: rgba(139, 92, 235, 0.4);
            transform: translateY(-2px);
        }

        .cyber-page-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        /* 📱 Адаптивность */
        @media (max-width: 1200px) {
            .cyber-grid {
                grid-template-columns: 1fr;
            }
            
            .cyber-filters {
                position: relative;
                top: 0;
            }
            
            .main-title {
                font-size: 3rem;
            }
        }

        @media (max-width: 768px) {
            .main-title {
                font-size: 2.5rem;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .cyber-btn-group {
                grid-template-columns: 1fr;
            }
            
            .log-header {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <!-- 🌌 Анимированный фон -->
    <div id="particles-js"></div>

    <div class="cyber-container">
        <!-- 🚀 Хедер -->
        <header class="cyber-header">
            <h1 class="main-title">NEO-LOGS</h1>
            <p class="subtitle">REAL-TIME SERVER MONITORING DASHBOARD</p>
        </header>

        <!-- 🎛️ Основной контент -->
        <div class="cyber-grid">
            <!-- 🎚️ Боковая панель фильтров -->
            <aside class="cyber-filters" data-tilt data-tilt-max="5" data-tilt-speed="400" data-tilt-perspective="1000">
                <div class="filters-header">
                    <i class="fas fa-sliders-h"></i>
                    <h2>ФИЛЬТРЫ И НАСТРОЙКИ</h2>
                </div>

                <div class="filter-group">
                    <label class="filter-label">Игрок (Никнейм)</label>
                    <input type="text" class="cyber-input" placeholder="Введите ник...">
                </div>

                <div class="filter-group">
                    <label class="filter-label">Категория</label>
                    <select class="cyber-input">
                        <option value="">Все категории</option>
                        <option value="vip">VIP чат</option>
                        <option value="family">Семьи</option>
                        <option value="rent">Аренда транспорта</option>
                        <option value="rp">RP чат</option>
                        <option value="complaint">Жалобы/Вопросы</option>
                        <option value="nonrp">NonRP чат</option>
                        <option value="numbers">Номера</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label class="filter-label">ID игрока</label>
                    <input type="text" class="cyber-input" placeholder="Введите ID...">
                </div>

                <div class="filter-group">
                    <label class="filter-label">IP адрес</label>
                    <input type="text" class="cyber-input" placeholder="Введите IP...">
                </div>

                <div class="filter-group">
                    <label class="filter-label">Сумма транзакции</label>
                    <input type="number" class="cyber-input" placeholder="Минимальная сумма...">
                </div>

                <div class="filter-group">
                    <label class="filter-label">Мин. время (MSK)</label>
                    <input type="datetime-local" class="cyber-input">
                </div>

                <div class="filter-group">
                    <label class="filter-label">Макс. время (MSK)</label>
                    <input type="datetime-local" class="cyber-input">
                </div>

                <div class="cyber-btn-group">
                    <button class="cyber-btn cyber-btn-primary">
                        <i class="fas fa-play-circle"></i> Применить
                    </button>
                    <button class="cyber-btn cyber-btn-secondary">
                        <i class="fas fa-undo"></i> Сбросить
                    </button>
                </div>
            </aside>

            <!-- 📊 Основная область -->
            <main class="cyber-main">
                <!-- 🎪 Статистика -->
                <section class="stats-grid">
                    <div class="cyber-stat-card" data-tilt>
                        <div class="stat-icon">
                            <i class="fas fa-broadcast-tower"></i>
                        </div>
                        <div class="stat-value">154</div>
                        <div class="stat-label">Событий за час</div>
                    </div>
                    <div class="cyber-stat-card" data-tilt>
                        <div class="stat-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-value" style="color: var(--danger);">23</div>
                        <div class="stat-label">Нарушений RP</div>
                    </div>
                    <div class="cyber-stat-card" data-tilt>
                        <div class="stat-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-value" style="color: var(--success);">$1.2M</div>
                        <div class="stat-label">Общий оборот</div>
                    </div>
                    <div class="cyber-stat-card" data-tilt>
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-value" style="color: var(--accent-secondary);">89</div>
                        <div class="stat-label">Активных игроков</div>
                    </div>
                </section>

                <!-- 📜 Лента логов -->
                <section class="cyber-logs-container">
                    <div class="logs-header">
                        <h2 class="logs-title">
                            <i class="fas fa-list-alt"></i> ЖУРНАЛ СОБЫТИЙ
                        </h2>
                        <div class="live-indicator">
                            <div class="pulse-dot"></div>
                            <span>LIVE</span>
                        </div>
                    </div>

                    <div class="cyber-logs-feed" id="cyberLogsFeed">
                        <!-- Логи будут добавляться через JS -->
                    </div>

                    <!-- 🔄 Пагинация -->
                    <div class="cyber-pagination">
                        <button class="cyber-page-btn" id="prevPage">
                            <i class="fas fa-chevron-left"></i> Назад
                        </button>
                        <span style="color: var(--text-secondary);">Страница 1</span>
                        <button class="cyber-page-btn" id="nextPage">
                            Вперед <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    </div>

    <script>
        // 🎮 ИНИЦИАЛИЗАЦИЯ ВСЕХ БИБЛИОТЕК

        // Частицы фона
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#8b5ceb" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#8b5ceb",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            }
        });

        // 3D эффекты для карточек
        if (document.querySelector('.cyber-filters')) {
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                max: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
            });
        }

        // 🎲 ДАННЫЕ ЛОГОВ (замени на свои реальные данные)
        const cyberLogData = [
            {
                time: "05/10/2025 18:34:04",
                category: "VIP чат",
                player: "Proitv_MuzoloW",
                id: "812967",
                ip: "77.40.62.160",
                amount: "—",
                description: "Выставил на маркет сумку доставщика рукав копилка и леха кура все за 50кг",
                color: "#8b5ceb"
            },
            {
                time: "05/10/2025 18:34:04",
                category: "Семьи",
                player: "Loki_Yakushev",
                id: "242187",
                ip: "62.16.54.204",
                amount: "—",
                description: "Семья: [{9932CC}PRIDE {9932CC}63 (SQLID: 2072)] Загрузил автомобиль: 451",
                color: "#23d160"
            },
            {
                time: "05/10/2025 18:34:04",
                category: "Аренда транспорта",
                player: "Gasoline_Forbes",
                id: "207039",
                ip: "212.124.19.153",
                amount: "-300",
                description: "Штраф после семейного ДТП",
                color: "#00d4ff"
            },
            {
                time: "05/10/2025 18:34:04",
                category: "RP чат",
                player: "Evgeniy_Majority",
                id: "244036",
                ip: "176.213.180.48",
                amount: "—",
                description: "сядь егедим",
                color: "#ffdd57"
            },
            {
                time: "05/10/2025 18:34:04",
                category: "Подключения/Отключания",
                player: "Abdulbori_Flertov",
                id: "931056",
                ip: "151.252.94.227",
                amount: "300",
                description: "Пользователь подключился. Платформа: Android (Play Market). APPMDID: 13427180858950330270",
                color: "#ff2a6d"
            }
        ];

        // 🎨 ЦВЕТА ДЛЯ КАТЕГОРИЙ
        const categoryColors = {
            'VIP чат': '#8b5ceb',
            'Семьи': '#23d160', 
            'Аренда транспорта': '#00d4ff',
            'RP чат': '#ffdd57',
            'NonRP чат': '#ff6b35',
            'Жалобы/Вопросы': '#ff3860',
            'Подключения/Отключания': '#ff2a6d',
            'Админ-действия': '#a855f7',
            'Взаимодействие с казино': '#f59e0b',
            'Начальные работы': '#10b981',
            'Трейды': '#8b5ceb'
        };

        // 🛠️ ФУНКЦИИ

        // Создание HTML для записи лога
        function createCyberLogEntry(log, index) {
            const isNegative = log.amount.startsWith('-');
            const categoryColor = categoryColors[log.category] || log.color || '#8b5ceb';
            
            return `
                <div class="cyber-log-entry" style="animation-delay: ${index * 0.1}s">
                    <div class="log-header">
                        <div>
                            <span class="log-category" style="background: ${categoryColor}20; color: ${categoryColor}; border: 1px solid ${categoryColor}40;">
                                ${log.category}
                            </span>
                            <span class="log-player">${log.player}</span>
                        </div>
                        <div class="log-amount ${isNegative ? 'negative' : ''}">
                            ${isNegative ? '−' : ''}${isNegative ? log.amount.substring(1) : log.amount}
                        </div>
                    </div>
                    <div class="log-meta">
                        <span><i class="fas fa-id-card"></i> ID: ${log.id}</span>
                        <span><i class="fas fa-network-wired"></i> IP: ${log.ip}</span>
                        <span><i class="fas fa-clock"></i> ${log.time} (MSK)</span>
                    </div>
                    <div class="log-description">
                        ${log.description}
                    </div>
                </div>
            `;
        }

        // Заполнение логов
        function populateCyberLogs() {
            const logsFeed = document.getElementById('cyberLogsFeed');
            cyberLogData.forEach((log, index) => {
                setTimeout(() => {
                    logsFeed.innerHTML += createCyberLogEntry(log, index);
                }, index * 100);
            });
        }

        // Анимации появления при скролле
        gsap.registerPlugin(ScrollTrigger);

        function initAnimations() {
            gsap.utils.toArray('.cyber-stat-card, .cyber-log-entry').forEach(item => {
                gsap.fromTo(item, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Анимация заголовка
            gsap.from('.main-title', {
                duration: 1.5,
                y: -100,
                opacity: 0,
                ease: "power3.out"
            });
        }

        // 📦 ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
        document.addEventListener('DOMContentLoaded', function() {
            populateCyberLogs();
            initAnimations();
            
            // Обработчики пагинации
            document.getElementById('nextPage').addEventListener('click', function() {
                // Твоя логика пагинации
                console.log('Next page clicked');
            });
            
            document.getElementById('prevPage').addEventListener('click', function() {
                // Твоя логика пагинации  
                console.log('Prev page clicked');
            });

            // Анимация неоновых элементов
            anime({
                targets: '.cyber-stat-card',
                translateY: [-10, 0],
                opacity: [0, 1],
                delay: anime.stagger(100),
                duration: 1000,
                easing: 'easeOutElastic(1, .8)'
            });
        });

        // 🌐 WebSocket для реального времени (пример)
        function initWebSocket() {
            // Твоя реализация WebSocket для live-обновлений
            /*
            const ws = new WebSocket('wss://your-server/logs');
            ws.onmessage = function(event) {
                const newLog = JSON.parse(event.data);
                addNewLogToFeed(newLog);
            };
            */
        }

        // Функция добавления нового лога
        function addNewLogToFeed(log) {
            const logsFeed = document.getElementById('cyberLogsFeed');
            const newLogElement = createCyberLogEntry(log, 0);
            
            // Анимация появления нового лога
            logsFeed.insertAdjacentHTML('afterbegin', newLogElement);
            const newLog = logsFeed.firstElementChild;
            
            gsap.fromTo(newLog, {
                opacity: 0,
                scale: 0.8,
                y: -20
            }, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        }
    </script>
</body>
</html>
