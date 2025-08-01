const convertButton = document.querySelector(".convert-button")
const currencySelectTo = document.getElementById("select-to")
const currencySelectFrom = document.querySelector("#select-from")
const valueInput = document.querySelector(".input-valor-conversao")

let lastConvertedValue = 0;

const currencies = {

    "real": { name: "Real Brasileiro", code: "BRL", locale: "pt-BR", image: "./assets/real.png", rate: 1.0 },
    "dolar": { name: "Dólar Americano", code: "USD", locale: "en-US", image: "./assets/dolar.png", rate: 5.25 },
    "euro": { name: "Euro", code: "EUR", locale: "de-DE", image: "./assets/euro.png", rate: 6.20 },
    "libra": { name: "Libra Esterlina", code: "GBP", locale: "en-GB", image: "./assets/libraEsterlina.png", rate: 7.05 },
    "iene-japones": { name: "Iene Japonês", code: "JPY", locale: "ja-JP", image: "./assets/ieneJapones.jpg", rate: 0.034 },
    "won-sul-coreano": { name: "Won Sul-Coreano", code: "KRW", locale: "ko-KR", image: "./assets/wonSul-Coreano.jpg", rate: 0.0038 },
    "cedi-ganes": { name: "Cedi Ganês", code: "GHS", locale: "en-GH", image: "./assets/cediGanês.jpg", rate: 0.07 },
    "colon-costarriquenho": { name: "Colón Costarriquenho", code: "CRC", locale: "es-CR", image: "./assets/colonCostarriquenho.jpg", rate: 0.01 },
    "dong-vietnamita": { name: "Dong Vietnamita", code: "VND", locale: "vi-VN", image: "./assets/dongVietnamita.jpg", rate: 0.0002 },
    "guarani-paraguaio": { name: "Guarani Paraguaio", code: "PYG", locale: "es-PY", image: "./assets/guaraniParaguaio.jpg", rate: 0.0007 },
    "hryvnia-ucraniana": { name: "Hryvnia Ucraniana", code: "UAH", locale: "uk-UA", image: "./assets/hryvniaUcraniana.jpg", rate: 0.13 },
    "kip-laociano": { name: "Kip Laociano", code: "LAK", locale: "lo-LA", image: "./assets/kipLaociano.png", rate: 0.00024 },
    "lari-georgiano": { name: "Lari Georgiano", code: "GEL", locale: "ka-GE", image: "./assets/lariGeorgiano.jpg", rate: 1.85 },
    "lira-turca": { name: "Lira Turca", code: "TRY", locale: "tr-TR", image: "./assets/liraTurca.jpg", rate: 0.16 },
    "manat-azerbaijano": { name: "Manat Azerbaijano", code: "AZN", locale: "az-AZ", image: "./assets/manatAzerbaijano.jpeg", rate: 3.09 },
    "naira-nigeriana": { name: "Naira Nigeriana", code: "NGN", locale: "en-NG", image: "./assets/nairaNigeriana.jpg", rate: 0.0035 },
    "peso-argentino": { name: "Peso Argentino", code: "ARS", locale: "es-AR", image: "./assets/pesoArgentino.png", rate: 0.0058 },
    "peso-filipino": { name: "Peso Filipino", code: "PHP", locale: "en-PH", image: "./assets/pesoFilipino.jpg", rate: 0.089 },
    "riel-cambojano": { name: "Riel Cambojano", code: "KHR", locale: "km-KH", image: "./assets/rielCambojano.jpg", rate: 0.0013 },
    "rupia-indiana": { name: "Rúpia Indiana", code: "INR", locale: "en-IN", image: "./assets/rupiaIndiana.png", rate: 0.063 },
    "tenge-cazaque": { name: "Tenge Cazaque", code: "KZT", locale: "kk-KZ", image: "./assets/tengeCazaque.jpg", rate: 0.011 },
    "tugrik-mongol": { name: "Tugrik Mongol", code: "MNT", locale: "mn-MN", image: "./assets/tugrikMongol.jpg", rate: 0.0015 }
}

function convertValues() {
    const inputCurrencyValue = parseFloat(valueInput.value) || 0
    const valueToConvertEl = document.querySelector("#converter")
    const valueConvertedEl = document.querySelector("#convertido")

    const fromCurrencyKey = currencySelectFrom.value
    const toCurrencyKey = currencySelectTo.value

    if (!fromCurrencyKey || !toCurrencyKey) {
        return;
    }

    const fromCurrency = currencies[fromCurrencyKey]
    const toCurrency = currencies[toCurrencyKey]

    valueToConvertEl.innerHTML = new Intl.NumberFormat(fromCurrency.locale, {
        style: "currency",
        currency: fromCurrency.code
    }).format(inputCurrencyValue)

    const valueInBRL = inputCurrencyValue * fromCurrency.rate

    const convertedValue = valueInBRL / toCurrency.rate

    lastConvertedValue = convertedValue;

    valueConvertedEl.innerHTML = new Intl.NumberFormat(toCurrency.locale, {
        style: "currency",
        currency: toCurrency.code
    }).format(convertedValue)
}

function updateCurrencyUI(selectElement, nameElementId, imageElementId, rateElementId) {
    const currencyName = document.getElementById(nameElementId)
    const currencyImage = document.getElementById(imageElementId)
    const rateElement = document.getElementById(rateElementId)

    const selectedCurrencyKey = selectElement.value;

    if (!selectedCurrencyKey) {
        currencyName.innerHTML = "Moeda";
        currencyImage.src = "./assets/placeholder.png";
        rateElement.innerHTML = "";
        convertValues();
        return;
    }

    const selectedCurrency = currencies[selectedCurrencyKey]

    currencyName.innerHTML = selectedCurrency.name
    currencyImage.src = selectedCurrency.image

    const brlFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    rateElement.innerHTML = selectedCurrency.code === 'BRL'
        ? 'Moeda Base'
        : `1 ${selectedCurrency.code} = ${brlFormatter.format(selectedCurrency.rate)}`;

    convertValues()
}

function swapCurrencies() {
    const fromValue = currencySelectFrom.value;
    const toValue = currencySelectTo.value;

    if (!fromValue || !toValue) return;

    currencySelectFrom.value = toValue;
    currencySelectTo.value = fromValue;

    currencySelectFrom.dispatchEvent(new Event('change'));
    currencySelectTo.dispatchEvent(new Event('change'));
}

async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(lastConvertedValue);
        alert("Valor copiado para a área de transferência!");
    } catch (err) {
        console.error('Falha ao copiar o valor: ', err);
        alert("Não foi possível copiar o valor.");
    }
}

function getFormattedDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
}

async function getAndSetRates() {
    const loadingMessage = document.getElementById("loading-message");

    loadingMessage.textContent = 'Buscando cotações oficiais...';
    convertButton.disabled = true;
    valueInput.disabled = true;

    try {
        let ratesData = null;
        let attempts = 0;
        const maxAttempts = 7;

        while (!ratesData && attempts < maxAttempts) {
            const date = new Date();
            date.setDate(date.getDate() - attempts);
            const formattedDate = getFormattedDate(date);

            const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(dataCotacao=@dataCotacao)?@dataCotacao='${formattedDate}'&$format=json`;

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (data.value && data.value.length > 0) {
                    ratesData = data.value;
                }
            }
            attempts++;
        }

        if (!ratesData) {
            throw new Error('Não foi possível obter as cotações do Banco Central nos últimos 7 dias.');
        }

        const bcbRates = ratesData.reduce((acc, currency) => {
            acc[currency.simbolo] = currency.cotacaoVenda;
            return acc;
        }, {});

        for (const key in currencies) {
            const currencyCode = currencies[key].code;
            if (bcbRates[currencyCode]) {
                currencies[key].rate = bcbRates[currencyCode];
            }
        }

        console.log('Cotações do Banco Central atualizadas com sucesso!');
        loadingMessage.textContent = 'Cotações atualizadas!';
        setTimeout(() => { loadingMessage.textContent = ''; }, 3000);

    } catch (error) {
        console.error('Erro ao atualizar cotações:', error);
        loadingMessage.textContent = 'Erro ao buscar cotações. Usando valores padrão.';
    } finally {
        convertButton.disabled = false;
        valueInput.disabled = false;
        updateCurrencyUI(currencySelectFrom, "from-currency-name", "from-currency-image", "from-currency-rate");
        updateCurrencyUI(currencySelectTo, "currency-name", "currency-image", "to-currency-rate");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const swapButton = document.getElementById('swap-button');
    const copyButton = document.getElementById('copy-button');

    valueInput.value = '';
    currencySelectFrom.selectedIndex = 0;
    currencySelectTo.selectedIndex = 0;

    convertButton.addEventListener("click", convertValues);
    currencySelectTo.addEventListener("change", () => updateCurrencyUI(currencySelectTo, "currency-name", "currency-image", "to-currency-rate"));
    currencySelectFrom.addEventListener("change", () => updateCurrencyUI(currencySelectFrom, "from-currency-name", "from-currency-image", "from-currency-rate"));
    swapButton.addEventListener('click', swapCurrencies);
    copyButton.addEventListener('click', copyToClipboard);

    getAndSetRates();
});