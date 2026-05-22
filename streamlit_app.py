import streamlit as st

st.set_page_config(page_title="ContractIQ AI", layout="wide")

st.title("🤖 ContractIQ AI")

st.write("Paste your contract below to analyze")

text = st.text_area("Contract Input")

if st.button("Analyze"):
    if text:
        st.success("Analyzing contract...")
        st.write("AI processing will happen here")
    else:
        st.warning("Please enter contract text")
