
    document.addEventListener('DOMContentLoaded', () => {
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        const contentSections = document.querySelectorAll('.content-section');
        const menuBtn = document.getElementById('menu-btn');
        const sidebar = document.getElementById('sidebar');

        function updateContent(hash) {
            hash = hash || window.location.hash || '#intro';
            
            sidebarLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === hash);
            });

            contentSections.forEach(section => {
                section.classList.toggle('active', section.id === hash.substring(1));
            });
            
            if (hash === '#fotografo') initPhotoFlow();
            if (hash === '#viagem') initBranchingChart();
        }
        
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const hash = link.getAttribute('href');
                history.pushState(null, null, hash);
                updateContent(hash);
                if (window.innerWidth < 768) {
                   sidebar.classList.add('-translate-x-full');
                }
            });
        });

        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });

        window.addEventListener('popstate', () => updateContent());
        updateContent();

        // --- Fluxo do Fotógrafo ---
        let fileState = 'working'; // working, staged, committed
        const fileEl = document.getElementById('file-representation');
        const workingDirArea = document.getElementById('working-dir-area');
        const stagingArea = document.getElementById('staging-area');
        const repoArea = document.getElementById('repo-area');
        const commitsLog = document.getElementById('commits-log');
        const addBtn = document.getElementById('add-btn');
        const commitBtn = document.getElementById('commit-btn');
        const resetBtn = document.getElementById('reset-btn');
        const photoFlowStatus = document.getElementById('photo-flow-status');
        
        function initPhotoFlow() {
            fileState = 'working';
            workingDirArea.appendChild(fileEl);
            commitsLog.innerHTML = '';
            addBtn.disabled = false;
            commitBtn.disabled = true;
            photoFlowStatus.textContent = "O arquivo está no seu estúdio. Faça alterações!";
        }

        addBtn.addEventListener('click', () => {
            if (fileState === 'working') {
                fileState = 'staged';
                stagingArea.appendChild(fileEl);
                addBtn.disabled = true;
                commitBtn.disabled = false;
                photoFlowStatus.textContent = "Arquivo enquadrado! Pronto para a foto.";
            }
        });

        commitBtn.addEventListener('click', () => {
            if (fileState === 'staged') {
                fileState = 'committed';
                const commitId = Math.random().toString(36).substring(2, 9);
                const newCommit = document.createElement('div');
                newCommit.className = 'bg-gray-800 p-2 rounded text-xs text-left';
                newCommit.innerHTML = `<span class="text-amber-300">commit ${commitId}</span><br>feat: Adiciona novo arquivo`;
                commitsLog.prepend(newCommit);
                stagingArea.removeChild(fileEl);
                commitBtn.disabled = true;
                photoFlowStatus.textContent = "Foto tirada e guardada no álbum!";
            }
        });
        
        resetBtn.addEventListener('click', initPhotoFlow);
        
        initPhotoFlow();

        // --- Viagem no Tempo (Branches) ---
        let branchChart;
        function initBranchingChart() {
            const ctx = document.getElementById('branching-chart').getContext('2d');
            let commitCounter = { main: 1 };
            let datasets = [{
                label: 'main',
                data: [{x: 0, y: 0}],
                borderColor: '#FBBF24',
                backgroundColor: '#FBBF24',
                pointRadius: 8,
                pointHoverRadius: 10,
                showLine: true,
                tension: 0
            }];
            let activeBranch = 'main';
            let branchY = 0;

            const config = {
                type: 'scatter',
                data: { datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    plugins: {
                        legend: { labels: { color: '#D1D5DB' } },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': commit ' + (context.dataIndex + 1);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            };
            
            if(branchChart) branchChart.destroy();
            branchChart = new Chart(ctx, config);

            document.getElementById('branch-commit-btn').onclick = () => {
                const ds = branchChart.data.datasets.find(d => d.label === activeBranch);
                if (ds) {
                    commitCounter[activeBranch] = (commitCounter[activeBranch] || 0) + 1;
                    ds.data.push({ x: ds.data[ds.data.length - 1].x + 1, y: ds.yValue });
                    branchChart.update();
                }
            };

            document.getElementById('branch-create-btn').onclick = () => {
                const name = document.getElementById('branch-name-input').value || `feature/${Math.random().toString(36).substring(2, 7)}`;
                if (branchChart.data.datasets.find(d => d.label === name)) return;
                
                const parentDs = branchChart.data.datasets.find(d => d.label === activeBranch);
                if (!parentDs) return;

                const startPoint = parentDs.data[parentDs.data.length - 1];
                
                branchY++;
                const newDataset = {
                    label: name,
                    data: [startPoint, {x: startPoint.x + 1, y: branchY}],
                    borderColor: ['#34D399', '#60A5FA', '#A78BFA'][branchY % 3],
                    backgroundColor: ['#34D399', '#60A5FA', '#A78BFA'][branchY % 3],
                    pointRadius: 8,
                    pointHoverRadius: 10,
                    showLine: true,
                    tension: 0,
                    yValue: branchY
                };
                branchChart.data.datasets.push(newDataset);
                activeBranch = name;
                commitCounter[name] = 1;
                branchChart.update();
            };

            document.getElementById('branch-merge-btn').onclick = () => {
                if (activeBranch === 'main') return;
                const featureDs = branchChart.data.datasets.find(d => d.label === activeBranch);
                const mainDs = branchChart.data.datasets.find(d => d.label === 'main');
                if (!featureDs || !mainDs) return;

                const lastFeaturePoint = featureDs.data[featureDs.data.length - 1];
                const lastMainPoint = mainDs.data[mainDs.data.length - 1];
                
                const mergePoint = { x: Math.max(lastFeaturePoint.x, lastMainPoint.x) + 1, y: 0 };
                
                featureDs.data.push(mergePoint);
                mainDs.data.push(mergePoint);
                
                activeBranch = 'main';
                branchChart.update();
            };
            
            document.getElementById('branch-reset-btn').onclick = initBranchingChart;
        }
        initBranchingChart();
        
        // --- Guia de Comandos ---
        const commands = [
            { cmd: 'git config', desc: 'Define suas informações de autor (nome, email).' },
            { cmd: 'git init', desc: 'Inicia um novo repositório na pasta atual.' },
            { cmd: 'git clone', desc: 'Cria uma cópia local de um repositório remoto.' },
            { cmd: 'git status', desc: 'Mostra o estado atual do seu repositório.' },
            { cmd: 'git add', desc: 'Adiciona alterações à Staging Area, para o próximo commit.' },
            { cmd: 'git commit', desc: 'Salva um snapshot do que está na Staging Area para o histórico.' },
            { cmd: 'git log', desc: 'Mostra o histórico de commits.' },
            { cmd: 'git branch', desc: 'Lista, cria ou apaga branches.' },
            { cmd: 'git checkout', desc: 'Muda de uma branch para outra.' },
            { cmd: 'git merge', desc: 'Funde as alterações de uma branch na branch atual.' },
            { cmd: 'git push', desc: 'Envia seus commits locais para o repositório remoto.' },
            { cmd: 'git pull', desc: 'Busca e funde as alterações do remoto no seu local.' },
            { cmd: 'git diff', desc: 'Mostra as diferenças entre versões do código.' },
            { cmd: 'git blame', desc: 'Mostra quem foi o último a modificar cada linha de um arquivo.' }
        ];

        const commandList = document.getElementById('command-list');
        const commandSearch = document.getElementById('command-search');
        
        function renderCommands(filter = '') {
            commandList.innerHTML = '';
            const filteredCommands = commands.filter(c => c.cmd.includes(filter.toLowerCase()) || c.desc.toLowerCase().includes(filter.toLowerCase()));
            
            filteredCommands.forEach(c => {
                const div = document.createElement('div');
                div.className = 'bg-gray-800 p-4 rounded-lg';
                div.innerHTML = `
                    <h4 class="font-mono text-lg text-amber-300">${c.cmd}</h4>
                    <p class="text-gray-400 text-sm">${c.desc}</p>
                `;
                commandList.appendChild(div);
            });
        }
        
        commandSearch.addEventListener('input', (e) => renderCommands(e.target.value));
        renderCommands();
        
        // --- Copy Buttons ---
        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', () => {
                const pre = button.previousElementSibling;
                const code = pre.querySelector('code').innerText;
                
                const textArea = document.createElement('textarea');
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    button.textContent = 'Copiado!';
                    setTimeout(() => { button.textContent = 'Copiar'; }, 2000);
                } catch (err) {
                    console.error('Falha ao copiar texto: ', err);
                }
                document.body.removeChild(textArea);
            });
        });
    });