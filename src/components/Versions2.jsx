import React from 'react';
import styled from 'styled-components';

const Versions2 = () => {
    return (
        <StyledWrapper>
            <div className="stepper-box">
                <div className="stepper-step stepper-completed">
                    <div className="stepper-circle">
                        <svg viewBox="0 0 16 16" className="bi bi-check-lg" fill="currentColor" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                        </svg>
                    </div>
                    <div className="stepper-line" />
                    <div className="stepper-content">
                        <div className="stepper-title">Order Placed</div>
                        <div className="stepper-status">Completed</div>
                        <div className="stepper-time">May 28, 10:24 AM</div>
                    </div>
                </div>
                <div className="stepper-step stepper-active">
                    <div className="stepper-circle">2</div>
                    <div className="stepper-line" />
                    <div className="stepper-content">
                        <div className="stepper-title">Processing</div>
                        <div className="stepper-status">In Progress</div>
                        <div className="stepper-time">May 29, 02:15 PM</div>
                    </div>
                </div>
                <div className="stepper-step stepper-pending">
                    <div className="stepper-circle">3</div>
                    <div className="stepper-content">
                        <div className="stepper-title">Shipping</div>
                        <div className="stepper-status">Pending</div>
                        <div className="stepper-time">Estimated: May 30</div>
                    </div>
                </div>
                <div className="stepper-controls">
                    <button className="stepper-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                        Previous
                    </button>
                    <button className="stepper-button stepper-button-primary">
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                        </svg>
                    </button>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .stepper-box {
    background-color: white;
    border-radius: 12px;
    padding: 32px;
    width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .stepper-step {
    display: flex;
    margin-bottom: 32px;
    position: relative;
  }

  .stepper-step:last-child {
    margin-bottom: 0;
  }

  .stepper-line {
    position: absolute;
    left: 19px;
    top: 40px;
    bottom: -32px;
    width: 2px;
    background-color: #e2e8f0;
    z-index: 1;
  }

  .stepper-step:last-child .stepper-line {
    display: none;
  }

  .stepper-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    z-index: 2;
  }

  .stepper-completed .stepper-circle {
    background-color: #0f172a;
    color: white;
  }

  .stepper-active .stepper-circle {
    border: 2px solid #0f172a;
    color: #0f172a;
  }

  .stepper-pending .stepper-circle {
    border: 2px solid #e2e8f0;
    color: #94a3b8;
  }

  .stepper-content {
    flex: 1;
  }

  .stepper-title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .stepper-completed .stepper-title {
    color: #0f172a;
  }

  .stepper-active .stepper-title {
    color: #0f172a;
  }

  .stepper-pending .stepper-title {
    color: #94a3b8;
  }

  .stepper-status {
    font-size: 13px;
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    margin-top: 4px;
  }

  .stepper-completed .stepper-status {
    background-color: #dcfce7;
    color: #166534;
  }

  .stepper-active .stepper-status {
    background-color: #dbeafe;
    color: #1d4ed8;
  }

  .stepper-pending .stepper-status {
    background-color: #f1f5f9;
    color: #64748b;
  }

  .stepper-time {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 4px;
  }

  .stepper-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
  }

  .stepper-button {
    padding: 8px 16px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .stepper-button-primary {
    background-color: #0f172a;
    color: white;
    border-color: #0f172a;
  }`;

export default Versions2;