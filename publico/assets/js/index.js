$(function() {
    "use strict";

     // chart 1
	 
		  var ctx = document.getElementById('chart1').getContext('2d');
		
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
					datasets: [{
						label: 'New Visitor',
						data: [3, 3, 8, 5, 7, 4, 6, 4, 6, 3],
						backgroundColor: '#fff',
						borderColor: "transparent",
						pointRadius :"0",
						borderWidth: 3
					}, {
						label: 'Old Visitor',
						data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
						backgroundColor: "rgba(255, 255, 255, 0.25)",
						borderColor: "transparent",
						pointRadius :"0",
						borderWidth: 1
					}]
				},
			options: {
				maintainAspectRatio: false,
				legend: {
				  display: false,
				  labels: {
					fontColor: '#ddd',  
					boxWidth:40
				  }
				},
				tooltips: {
				  displayColors:false
				},	
			  scales: {
				  xAxes: [{
					ticks: {
						beginAtZero:true,
						fontColor: '#ddd'
					},
					gridLines: {
					  display: true ,
					  color: "rgba(221, 221, 221, 0.08)"
					},
				  }],
				   yAxes: [{
					ticks: {
						beginAtZero:true,
						fontColor: '#ddd'
					},
					gridLines: {
					  display: true ,
					  color: "rgba(221, 221, 221, 0.08)"
					},
				  }]
				 }

			 }
			});  
		
		
    // chart 2

		var ctx = document.getElementById("chart2").getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: ["Direct", "Affiliate", "E-mail", "Other"],
					datasets: [{
						backgroundColor: [
							"#ffffff",
							"rgba(255, 255, 255, 0.70)",
							"rgba(255, 255, 255, 0.50)",
							"rgba(255, 255, 255, 0.20)"
						],
						data: [5856, 2602, 1802, 1105],
						borderWidth: [0, 0, 0, 0]
					}]
				},
			options: {
				maintainAspectRatio: false,
			   legend: {
				 position :"bottom",	
				 display: false,
				    labels: {
					  fontColor: '#ddd',  
					  boxWidth:15
				   }
				}
				,
				tooltips: {
				  displayColors:false
				}
			   }
			});
		

		
		
   });	 
   
   function nome(valor) {
    return valor.replace(/[^a-zA-Z\s]/g, '')
        .replace(/\s+/g, ' ')
        .replace(/^\s+|\s+$/g, '');
}

function rg(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
    return valor;
}

function tel(valor) {
    return valor.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1)  $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(\d{4})\d+?$/, '$1');
}


function cpf(valor) {
    valor = valor.replace(/\D/g, '')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d{2})/, '$1-$2')
    valor = valor.replace(/(-\d{2})\d+?$/, '$1');
    return valor
}


function cep(valor) {
    return valor.replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
}



const campos = document.querySelectorAll('input');


campos.forEach(campo => {
    campo.addEventListener('input', function() {
        if (this.name === 'data') {
            this.value = data(this.value);
        } else if (this.name === 'rg') {
            this.value = rg(this.value);
        } else if (this.name === 'tel') {
            this.value = tel(this.value);
        } else if (this.name === 'cep') {
            this.value = cep(this.value);
        } else if (this.name === 'cpf') {
            this.value = cpf(this.value);
        }
    });

    campo.addEventListener('blur', function() {
        if (this.name === 'rg' && this.value.length < 12) {
            alert('RG Inválido!');
        } else if (this.name === 'data' && this.value.length < 6) {
            alert('Data Inválida!');
        } else if (this.name === 'tel' && this.value.length < 16) {
            alert('Telefone Inválido!');
        } else if (this.name === 'cpf' && this.value.length < 14) {
            alert('CPF Inválido!');
        } else if (this.name === 'cep' && this.value.length < 9) {
            alert('CEP Inválido!');
        } else if (this.name === 'uf' && this.value.length < 2) {
            alert('UF Inválido!');
        }
    });
});


const itemInput = document.getElementById('item');
        const totalSpan = document.getElementById('total');
        const valorItem = 1400;

        itemInput.addEventListener('input', function() {
            const quantidade = parseInt(itemInput.value);
            const total = quantidade * valorItem;
            totalSpan.textContent = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        });

		document.getElementById("btnComprar").addEventListener("click", function() {
            alert("Compra efetuada!");
        });

		document.getElementById("btnRegistrar").addEventListener("click", function() {
            alert("Cadastro realizado!");
        });





	