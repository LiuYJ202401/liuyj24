// JavaScript Document
//html里应该含有<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
function factorial(n) {    //计算阶乘
	if (n === 0 || n === 1) return 1;            
	let result = 1;         
	for (let i = 2; i <= n; i++) {               
		result *= i;
	}            
	return Number(result);     
}

function Pd(ri, k) {    //泊松分布的横纵坐标    
	const x = Array.from({ length: k + 1 }, (_, i) => i);            
	const y = x.map(i => (Math.E ** (-ri)) * (ri ** i) / factorial(i));            
	return { x, y };
        }
        
function updatePlot(ri, k) {            
	const { x, y } = Pd(ri, k);
	const data = [{                
		x: x,       
		y: y,        
		type: 'bar',        
		width: 0.5        
	}];
	const yMax = Math.max(...y); // 计算 y 的最大值
  // 将 y 轴的最大值对齐到最近的 0.1 刻度
	const fixedStep = 0.1; // 固定刻度
	const alignedYMax = Math.ceil(yMax / fixedStep) * fixedStep;
	const layout = {
		title: `泊松分布 (λ=${ri}, k=${k})`,
		xaxis: { title: 'x' },
		yaxis: { title: 'P',range:[0,alignedYMax] }  
	};
	Plotly.newPlot('plot', data, layout);    //新建图表
}
        
function onSliderChange() {
	const ri = parseFloat(document.getElementById('ri-slider').value);
	const k = parseInt(document.getElementById('k-slider').value);
	document.getElementById('ri-input').value = ri;
	document.getElementById('k-input').value = k;
	updatePlot(ri, k);    
}

function onInputChange() {
	const ri = parseFloat(document.getElementById('ri-input').value);
	const k = parseInt(document.getElementById('k-input').value);
	document.getElementById('ri-slider').value = ri;
	document.getElementById('k-slider').value = k;
	updatePlot(ri, k);    
}

function main() {
	const ri = 5;
	const k = 10;
	updatePlot(ri, k);
	const riSlider = document.getElementById('ri-slider');
	const kSlider = document.getElementById('k-slider');
	const riInput = document.getElementById('ri-input');
	const kInput = document.getElementById('k-input');
	riSlider.value = ri;
	kSlider.value = k;
	riInput.value = ri;
	kInput.value = k;
	riSlider.addEventListener('input', onSliderChange);
	kSlider.addEventListener('input', onSliderChange);
	riInput.addEventListener('input', onInputChange);
	kInput.addEventListener('input', onInputChange);
}

main()