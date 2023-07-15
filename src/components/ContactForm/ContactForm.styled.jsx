const { default: styled } = require("styled-components");

export const FormContainer = styled.div`
display: flex;
justify-content: start;
align-items: flex-start;
max-width: 200px;
margin-bottom: 20px;
`

export const Form = styled.form`
display: flex;
justify-content: center;
align-items: flex-start;
gap: 10px;
flex-direction: column;
`

export const LabelForm = styled.label`
display: flex;
gap: 5px;
flex-direction: column;
font-weight: 700;
`

export const InputForm = styled.input`
width: 180px;
padding: 8px;
border: 1px solid #ccc;
border-radius: 10px;
color: #333;
outline-color: #fff;
transition: outline-color 2.3s ease;

:hover,
:focus {
  outline-color: #27ae60;
}
`

export const BtnForm = styled.button`
margin-left: auto;
margin-right: auto;
width: 100%;
padding: 10px;
background-color: #27ae60;
color: #fff;
outline-color: #27ae60;
border: none;
border-radius: 10px;
cursor: ${props => (props.isLoading ? 'not-allowed' : 'pointer')};
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
transition: background-color 0.3s ease;

:hover,
:focus {
  background-color: #2ecc71;
  background-color: ${props => (props.isLoading ? '#27ae60' : '#2ecc71')};
}
`