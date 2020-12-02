
function IntroductionTab(props) {
    return (
        <div>
            <p>Acest wizard vă va ajuta să creați o bază de date, un tabel, să introduceți intrări în tabel, și să vedeți interogări asupra acestuia.</p>
            <button className="btn btn-primary btn-lg" onClick={props.onNext}>
                Să începem!
            </button>
        </div>
    );
}

export default IntroductionTab;