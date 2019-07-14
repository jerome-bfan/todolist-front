import React, { Component } from 'react'

class facebookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            phone: "",
            isPro: false,
            siret: "",
            nbEmployes: "",

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <Col md={6}>
                <Card
                    title="Inscrivez-vous"
                    category="Remplir les informations ci dessous"
                    stats="Updated 3 minutes ago"
                    statsIcon="fa fa-history"
                    content={
                        <div style={{ flexDirection: "column" }}>
                            <div className="">
                                <Row>
                                    <Col md={8}>
                                        <Row style={{ marginBottom: 20 }}>
                                            <Button
                                                style={{
                                                    marginLeft: 15,
                                                    borderColor: "red"
                                                }}
                                                onClick={e => {
                                                    this.setState({
                                                        typeAccount: "user",
                                                        hideFormPro: false
                                                    });
                                                }}
                                            >
                                                Utilisateur
                        </Button>
                                            <text style={{ marginLeft: 10 }}>OU</text>
                                            <Button
                                                style={{
                                                    marginLeft: 15,
                                                    borderColor: "red"
                                                }}
                                                onClick={e => {
                                                    this.setState({
                                                        typeAccount: "pro",
                                                        hideFormPro: true
                                                    });
                                                }}
                                            >
                                                Pro
                        </Button>
                                        </Row>
                                        {this._renderFormPro()}
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "Username",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Username",
                                                    id: "registerUserName",
                                                    value: this.state.registerUserName,
                                                    onChange: this.handleChange
                                                }
                                            ]}
                                        />

                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "password",
                                                    type: "password",
                                                    bsClass: "form-control",
                                                    placeholder: "Password",
                                                    id: "registerPassword",
                                                    value: this.state.registerPassword,
                                                    onChange: this.handleChange
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "Mail",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Email",
                                                    id: "registerEmail",
                                                    value: this.state.registerEmail,
                                                    onChange: this.handleChange
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-12"]}
                                            proprieties={[
                                                {
                                                    label: "Téléphone ( +33625017105)",
                                                    type: "text",
                                                    bsClass: "form-control",
                                                    placeholder: "Téléphone ( +33625017105)",
                                                    id: "registerPhone",
                                                    value: this.state.registerPhone,
                                                    onChange: this.handleChange
                                                }
                                            ]}
                                        />
                                        <Button
                                            onClick={() => {
                                                postRegister(this.state)
                                                    .then(e => {
                                                        var mess = "Vous êtes inscrit";
                                                        this.setState({ successRegister: mess });
                                                        this.setState({
                                                            _notificationSystem: this.refs
                                                                .notificationSystem
                                                        });
                                                        var _notificationSystem = this.refs
                                                            .notificationSystem;
                                                        makeNotif(_notificationSystem, "info", mess);
                                                        this.setState({ errorRegister: "" });

                                                        console.log(e);

                                                        console.log("e");
                                                    })
                                                    .catch(e => {
                                                        console.log(e.body);
                                                        console.log("e");
                                                        this.setState({
                                                            errorRegister: "Veuillez réssayer"
                                                        });
                                                        this.setState({
                                                            _notificationSystem: this.refs
                                                                .notificationSystem
                                                        });
                                                        var _notificationSystem = this.refs
                                                            .notificationSystem;
                                                        makeNotif(
                                                            _notificationSystem,
                                                            "error",
                                                            "Veuillez réssayer"
                                                        );
                                                    });
                                            }}
                                        >
                                            Inscrivez-vous
                      </Button>

                                        <div
                                            style={{
                                                textAlign: "center",
                                                marginTop: 20,
                                                fontSize: 14,
                                                color: "red",
                                                fontWeight: 500,
                                                fontFamily: "roboto"
                                            }}
                                        >
                                            {this.state.errorRegister}
                                        </div>
                                        <div
                                            style={{
                                                textAlign: "center",
                                                marginTop: 20,
                                                fontSize: 14,
                                                color: "green",
                                                fontWeight: 500,
                                                fontFamily: "roboto"
                                            }}
                                        >
                                            {this.state.successRegister}
                                        </div>
                                    </Col>
                                </Row>
                                <br />
                            </div>
                        </div>
                    }
                />
            </Col>
        );
    }
}
_renderFormPro = () => {
    if (this.state.hideFormPro) {
        return (
            <div>
                <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                        {
                            label: "N° de siret",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "N° de siret",
                            id: "registerSiret",
                            value: this.state.registerSiret,
                            onChange: this.handleChange
                        }
                    ]}
                />
                <FormInputs
                    ncols={["col-md-12"]}
                    proprieties={[
                        {
                            label: "N° d'employés",
                            type: "number",
                            bsClass: "form-control",
                            placeholder: "N° d' employés",
                            id: "registerNbEmploye",
                            value: this.state.registerNbEmploye,
                            onChange: this.handleChange
                        }
                    ]}
                />
            </div>
        );
    }
};
export default facebookForm 