import React, {useState , useEffect} from 'react';
import '../components/Payment/payment.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
const Payment = () => {
    const navigate = useNavigate();
    const [selectedTier, setSelectedTier] = useState('');
    const jwtToken = localStorage.getItem("jwtToken");
    
    const handleTierSelect = (tier) => {
        setSelectedTier(tier);
    };
    useEffect(() => {
        if (!jwtToken) {
          navigate("/");
        }
      }, []);
    const plans = [
        { id: 1, title: '1 Post/Day', amount: '$3/month' },
        { id: 2, title: '3 Posts/Day', amount: '$5/month' },
        { id: 3, title: '5 Posts/Day', amount: '$10/month' }
    ];
    function handlePayment(e){
        console.log(e);
        setSelectedTier(e);
        localStorage.setItem('premiumMembership', selectedTier);
        alert(`Congratulations! You have purchased the ${selectedTier} premium membership.`);
        navigate('/myDetails');
    }
    return (
        <>
        <Navbar />
        <div className="payment-container">
            <div className="payment-details">
                <p>Buy premium to read more than 1 article Per day</p>
                <p>Keep Reading..! Keep Growing..!</p>
            </div>
            <div className='card-pay'>
            {plans.map((plan, index) => (
                <div className="payment-card" key={index}>
                    <h2 className="payment-card-title">{plan.title}</h2>
                    <p className="payment-amount">{plan.amount}</p>
                    <input type='radio' className="pay-button" onClick={() => handleTierSelect(plan.id)} />
                </div>
            ))}
            
            </div>
            <button className='pay-button' onClick={handlePayment}>Buy Now</button>
        </div>
        </>
    );
};

export default Payment;