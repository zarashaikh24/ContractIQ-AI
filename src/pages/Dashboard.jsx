import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Shield,
  DollarSign,
  Scale,
  Sparkles,
  Upload,
  Download,
  Copy,
  FileDown,
  Loader2,
  ArrowRight,
  MessageCircle,
  Send,
  Bot,
  User,
  Lightbulb
} from 'lucide-react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Debug logging
  console.log('Dashboard mounted');
  console.log('Location state:', location.state);
  
  // Get contract data with fallback
  const contractText = location.state?.contractText || '';
  const fileName = location.state?.fileName || 'Sample Contract';
  
  console.log('Contract text length:', contractText?.length || 0);
  console.log('File name:', fileName);
  
  // If no contract text provided, use demo contract
  const defaultDemoContract = `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of January 1, 2024, by and between TechCorp Inc. ("Provider") and Client Company LLC ("Client").

1. SERVICES
Provider agrees to provide software development services as outlined in Exhibit A.

2. PAYMENT TERMS
Client shall pay Provider $10,000 per month, due on the first day of each month. Late payments will incur a 5% penalty per month.

3. TERM AND TERMINATION
This Agreement shall commence on the date first written above and continue for a period of 12 months. Either party may terminate with 30 days written notice.

4. INTELLECTUAL PROPERTY
All work product created by Provider shall become the exclusive property of Client upon full payment.

5. CONFIDENTIALITY
Both parties agree to maintain confidentiality of all proprietary information shared during the term of this Agreement.

6. LIABILITY
Provider's liability shall be limited to the amount paid by Client in the preceding 3 months. Provider makes no warranties, express or implied.

7. INDEMNIFICATION
Client agrees to indemnify and hold harmless Provider from any claims arising from Client's use of the services.

8. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.`;

  const finalContractText = contractText || defaultDemoContract;
  
  console.log('Final contract text length:', finalContractText?.length || 0);
  
  const [loadingStage, setLoadingStage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [showImprovement, setShowImprovement] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);
  const [improvedContract, setImprovedContract] = useState(null);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const loadingStages = [
    { text: 'Reading contract...', icon: Upload },
    { text: 'Detecting risky clauses...', icon: AlertTriangle },
    { text: 'Evaluating payment terms...', icon: DollarSign },
    { text: 'Checking legal safety...', icon: Shield },
    { text: 'Generating recommendations...', icon: Sparkles },
    { text: 'Finalizing AI analysis...', icon: TrendingUp }
  ];

  const generationStages = [
    { text: 'Reviewing risky clauses...', icon: AlertTriangle },
    { text: 'Fixing legal ambiguities...', icon: Scale },
    { text: 'Optimizing legal wording...', icon: Sparkles },
    { text: 'Generating professional contract...', icon: FileText }
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingStage(prev => {
          if (prev < loadingStages.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              try {
                console.log('Generating analysis...');
                const mockAnalysis = generateIntelligentAnalysis(finalContractText, fileName);
                
                // Add dynamic recommendation based on scores
                const overallScore = mockAnalysis.scores.overall;
                if (overallScore >= 70) {
                  mockAnalysis.recommendation = {
                    status: 'safe',
                    title: 'Proceed with Caution',
                    message: 'This contract has minimal risk factors and appears relatively balanced. The terms are within acceptable industry standards.',
                    action: 'While the contract is relatively safe, always have a qualified attorney review any legal agreement before signing. Consider the specific context of your situation.'
                  };
                } else if (overallScore >= 45) {
                  mockAnalysis.recommendation = {
                    status: 'review',
                    title: 'Review Required',
                    message: 'This contract contains several concerning clauses that require careful attention. Some terms may disproportionately favor one party.',
                    action: 'Do not sign without addressing the flagged high-risk clauses. Negotiate better terms or seek legal counsel to protect your interests.'
                  };
                } else {
                  mockAnalysis.recommendation = {
                    status: 'high-risk',
                    title: 'High Risk - Do Not Sign',
                    message: 'This contract has significant legal and financial risks. Multiple clauses are heavily imbalanced and could expose you to substantial liability.',
                    action: 'Strongly recommend against signing this agreement as-is. Either negotiate major revisions to the problematic clauses or consider walking away from this deal.'
                  };
                }
                
                console.log('Analysis generated:', mockAnalysis);
                setAnalysis(mockAnalysis);
                setIsLoading(false);
              } catch (error) {
                console.error('Analysis generation error:', error);
                // Fallback to demo analysis
                try {
                  const mockAnalysis = generateIntelligentAnalysis(defaultDemoContract, 'Demo Contract');
                  
                  // Add dynamic recommendation for fallback too
                  const overallScore = mockAnalysis.scores.overall;
                  if (overallScore >= 70) {
                    mockAnalysis.recommendation = {
                      status: 'safe',
                      title: 'Proceed with Caution',
                      message: 'This contract has minimal risk factors and appears relatively balanced. The terms are within acceptable industry standards.',
                      action: 'While the contract is relatively safe, always have a qualified attorney review any legal agreement before signing.'
                    };
                  } else if (overallScore >= 45) {
                    mockAnalysis.recommendation = {
                      status: 'review',
                      title: 'Review Required',
                      message: 'This contract contains several concerning clauses that require careful attention.',
                      action: 'Do not sign without addressing the flagged high-risk clauses. Negotiate better terms or seek legal counsel.'
                    };
                  } else {
                    mockAnalysis.recommendation = {
                      status: 'high-risk',
                      title: 'High Risk - Do Not Sign',
                      message: 'This contract has significant legal and financial risks.',
                      action: 'Strongly recommend against signing this agreement as-is. Negotiate major revisions or walk away.'
                    };
                  }
                  
                  console.log('Fallback analysis generated:', mockAnalysis);
                  setAnalysis(mockAnalysis);
                  setIsLoading(false);
                } catch (fallbackError) {
                  console.error('Fallback analysis error:', fallbackError);
                  setIsLoading(false);
                }
              }
            }, 500);
            return prev;
          }
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isLoading, finalContractText, fileName]);

  const generateIntelligentAnalysis = (text, name) => {
    const content = text || '';
    const contentLower = content.toLowerCase();
    const wordCount = text?.split(/\s+/).length || 500;
    
    // DYNAMIC CLAUSE EXTRACTION - Parse actual contract sections
    const extractClauseText = (sectionName, keywords) => {
      const lines = content.split('\n');
      let capturing = false;
      let clauseText = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineLower = line.toLowerCase();
        
        // Start capturing if we find the section
        if (keywords.some(kw => lineLower.includes(kw))) {
          capturing = true;
        }
        
        // Stop at next numbered section or major heading
        if (capturing && i > 0 && /^\d+\.|^[A-Z\s]{10,}$/.test(line.trim()) && !keywords.some(kw => lineLower.includes(kw))) {
          break;
        }
        
        if (capturing) {
          clauseText += line + ' ';
        }
      }
      
      return clauseText.trim().substring(0, 300) || null;
    };

    // DYNAMIC CLAUSE DETECTION
    const clauses = [];
    let clauseId = 1;
    let legalRisk = 20;
    let financialRisk = 20;
    let complianceRisk = 20;

    // 1. PAYMENT TERMS
    const paymentText = extractClauseText('payment', ['payment', 'fee', 'compensation', 'invoice', 'subscription', 'pricing']);
    if (paymentText) {
      const hasAmount = /\$[\d,]+/.test(paymentText);
      const hasSubscription = /subscription|monthly|annual|per month|per year/i.test(paymentText);
      const penaltyMatch = paymentText.match(/(\d+)%.*penalty|penalty.*(\d+)%/i);
      const penaltyRate = penaltyMatch ? parseInt(penaltyMatch[1] || penaltyMatch[2]) : 0;
      
      let risk = 'low';
      let reason = 'Standard payment terms with clear structure. This is typical SaaS/service agreement language.';
      
      // Only flag high risk for truly excessive penalties
      if (penaltyRate >= 6) {
        risk = 'high';
        reason = `Excessive late payment penalty (${penaltyRate}% monthly = ${penaltyRate * 12}% annually) significantly exceeds industry standards and may be unenforceable. Standard rates are 1-2% monthly.`;
        financialRisk += 30;
      } else if (penaltyRate >= 3 && penaltyRate < 6) {
        risk = 'medium';
        reason = `Late payment penalty of ${penaltyRate}% monthly (${penaltyRate * 12}% annually) is above standard rates. Consider negotiating to 1.5-2% monthly.`;
        financialRisk += 15;
      } else if (!hasAmount && !hasSubscription) {
        // Only flag if BOTH amount AND subscription model are missing
        risk = 'medium';
        reason = 'Payment amounts are not clearly specified. Request clarification on pricing structure.';
        financialRisk += 12;
      } else if (hasSubscription && !hasAmount) {
        // Subscription model without specific amount is acceptable
        risk = 'low';
        reason = 'Subscription-based pricing model is referenced. Specific amounts may be in separate pricing schedule.';
      }
      
      clauses.push({
        id: clauseId++,
        title: 'Payment Terms',
        text: paymentText,
        risk,
        reason,
        category: 'Financial'
      });
    } else {
      financialRisk += 20;
      clauses.push({
        id: clauseId++,
        title: 'Payment Terms',
        text: 'Payment terms not clearly specified in contract.',
        risk: 'high',
        reason: 'Missing payment terms create significant ambiguity about compensation, timing, and penalties.',
        category: 'Financial'
      });
    }

    // 2. TERMINATION
    const termText = extractClauseText('termination', ['termination', 'terminate', 'cancel']);
    if (termText) {
      const hasNotice = /\d+\s*days?\s*notice|notice.*\d+\s*days?/i.test(termText);
      const noticeMatch = termText.match(/(\d+)\s*days?\s*notice|notice.*(\d+)\s*days?/i);
      const noticeDays = noticeMatch ? parseInt(noticeMatch[1] || noticeMatch[2]) : 0;
      const hasImmediate = /immediate.*termination/i.test(termText);
      const hasBreach = /breach|violation|default|cause/i.test(termText);
      const hasEitherParty = /either party|both parties/i.test(termText);
      const isOneSided = /provider may terminate|client may terminate/i.test(termText) && !hasEitherParty;
      
      let risk = 'low';
      let reason = 'Standard termination clause with balanced rights. This is typical contract language.';
      
      // Only flag high risk if immediate termination WITHOUT breach condition
      if (hasImmediate && !hasBreach && !hasNotice) {
        risk = 'high';
        reason = 'Allows immediate termination without notice or breach condition, creating instability. Standard contracts require 30-60 days notice except for material breach.';
        legalRisk += 25;
      } else if (hasImmediate && hasBreach) {
        // Immediate termination for breach is STANDARD and acceptable
        risk = 'low';
        reason = 'Allows immediate termination for breach, which is standard contract protection. Normal notice period applies for convenience termination.';
      } else if (!hasNotice && !hasImmediate) {
        risk = 'medium';
        reason = 'Termination notice period is not clearly specified. Request clarification on required notice.';
        legalRisk += 12;
      } else if (noticeDays > 0 && noticeDays < 30) {
        risk = 'medium';
        reason = `${noticeDays} days notice is shorter than typical 30-60 day standard. Consider negotiating longer notice period for stability.`;
        legalRisk += 10;
      } else if (isOneSided && !hasBreach) {
        risk = 'medium';
        reason = 'Termination rights may favor one party. Ensure both parties have equal termination rights.';
        legalRisk += 15;
      }
      
      clauses.push({
        id: clauseId++,
        title: 'Termination Clause',
        text: termText,
        risk,
        reason,
        category: 'Legal'
      });
    } else {
      legalRisk += 18;
      clauses.push({
        id: clauseId++,
        title: 'Termination Clause',
        text: 'Termination terms not specified.',
        risk: 'high',
        reason: 'Missing termination clause creates uncertainty about how and when the contract can be ended.',
        category: 'Legal'
      });
    }

    // 3. LIABILITY / INDEMNIFICATION
    const liabilityText = extractClauseText('liability', ['liability', 'indemnif', 'warrant', 'damages']);
    if (liabilityText) {
      const hasLimitedLiability = /limited.*liability|liability.*limited|liability.*shall.*not.*exceed/i.test(liabilityText);
      const hasNoIndirectDamages = /no.*indirect.*damages|not.*liable.*for.*indirect|excludes.*consequential/i.test(liabilityText);
      const hasNoWarranty = /no warrant|without warrant|makes no warrant|as-is|as is/i.test(liabilityText);
      const isOneSided = /client.*shall.*indemnif|provider.*shall.*indemnif/i.test(liabilityText) && !/mutual|both parties.*indemnif/i.test(liabilityText);
      const hasCapAmount = /\$[\d,]+/.test(liabilityText);
      const hasUnlimited = /unlimited.*liability|liability.*unlimited/i.test(liabilityText);
      
      let risk = 'low';
      let reason = 'Standard liability disclaimer. Excluding indirect damages is normal SaaS practice and protects both parties.';
      
      // Unlimited liability on one party is HIGH RISK
      if (hasUnlimited && isOneSided) {
        risk = 'high';
        reason = 'Unlimited liability imposed on one party creates severe financial exposure. Standard contracts cap liability at fees paid or reasonable amount.';
        legalRisk += 35;
      } else if (isOneSided && !hasNoIndirectDamages) {
        // One-sided indemnification without indirect damage exclusion
        risk = 'high';
        reason = 'One-sided indemnification without indirect damage exclusion creates unlimited liability exposure. Negotiate mutual indemnification.';
        legalRisk += 28;
      } else if (hasLimitedLiability && hasNoWarranty && hasNoIndirectDamages) {
        // This is STANDARD SaaS language - NOT risky
        risk = 'low';
        reason = 'Standard SaaS liability terms. Limiting liability and excluding indirect damages is industry-standard protection for both parties.';
      } else if (hasLimitedLiability && !hasCapAmount) {
        risk = 'medium';
        reason = 'Liability is limited but the specific cap amount is not stated. Request clarification on liability limits.';
        legalRisk += 12;
      } else if (isOneSided && hasNoIndirectDamages) {
        risk = 'medium';
        reason = 'Indemnification appears one-sided but indirect damages are excluded. Consider negotiating mutual indemnification.';
        legalRisk += 15;
      }
      
      clauses.push({
        id: clauseId++,
        title: 'Liability & Indemnification',
        text: liabilityText,
        risk,
        reason,
        category: 'Legal'
      });
    }

    // 4. CONFIDENTIALITY
    const confidText = extractClauseText('confidentiality', ['confidential', 'proprietary', 'non-disclosure', 'nda']);
    if (confidText) {
      const isMutual = /both parties|mutual|each party/i.test(confidText);
      const hasTimeLimit = /\d+\s*years?|perpetual|indefinite/i.test(confidText);
      const isSensitiveContract = /nda|non-disclosure agreement/i.test(contentLower);
      
      let risk = 'low';
      let reason = 'Standard confidentiality clause. This is basic legal protection found in most contracts.';
      
      if (!isMutual && isSensitiveContract) {
        // Only flag if it's specifically an NDA or sensitive agreement
        risk = 'medium';
        reason = 'Confidentiality obligations appear one-sided in this NDA. Both parties should protect each other\'s information equally.';
        complianceRisk += 12;
      } else if (!isMutual) {
        risk = 'low';
        reason = 'Confidentiality clause protects one party\'s information. This is acceptable for service agreements where only one party shares sensitive data.';
      } else if (isMutual && hasTimeLimit) {
        risk = 'low';
        reason = 'Mutual confidentiality with defined duration. This is standard best practice.';
      }
      
      clauses.push({
        id: clauseId++,
        title: 'Confidentiality',
        text: confidText,
        risk,
        reason,
        category: 'Compliance'
      });
    } else if (/nda|non-disclosure/i.test(contentLower)) {
      // Only flag missing confidentiality as high risk if it's supposed to be an NDA
      complianceRisk += 25;
      clauses.push({
        id: clauseId++,
        title: 'Confidentiality',
        text: 'No confidentiality provisions found.',
        risk: 'high',
        reason: 'This appears to be an NDA but lacks confidentiality provisions. This is a critical omission.',
        category: 'Compliance'
      });
    }

    // 5. INTELLECTUAL PROPERTY
    const ipText = extractClauseText('ip', ['intellectual property', 'ip rights', 'ownership', 'work product', 'proprietary']);
    if (ipText) {
      const ownershipClear = /shall become.*property|ownership.*transfer|client.*owns|provider.*owns|platform.*owns/i.test(ipText);
      const hasPaymentCondition = /upon.*payment|after.*payment|full payment/i.test(ipText);
      const platformOwnsSystem = /platform.*owns.*system|provider.*retains.*ownership.*platform/i.test(ipText);
      const clientOwnsData = /client.*owns.*data|customer.*owns.*content/i.test(ipText);
      const hasLicense = /license|right to use/i.test(ipText);
      const isContradictory = /client.*owns.*all/i.test(ipText) && /provider.*owns.*all/i.test(ipText);
      
      let risk = 'low';
      let reason = 'Standard IP ownership structure. Platform owns system, client owns their data. This is typical SaaS model.';
      
      if (isContradictory) {
        risk = 'high';
        reason = 'Contradictory IP ownership claims. Both parties claim ownership of the same assets. This requires immediate clarification.';
        legalRisk += 30;
      } else if (!ownershipClear && !hasLicense) {
        risk = 'medium';
        reason = 'IP ownership and usage rights are unclear. Clarify who owns what and what rights are granted.';
        legalRisk += 15;
      } else if (platformOwnsSystem && clientOwnsData) {
        // This is STANDARD SaaS - NOT risky
        risk = 'low';
        reason = 'Standard SaaS IP model: provider owns the platform/system, client owns their data and content. This is industry best practice.';
      } else if (ownershipClear && !hasPaymentCondition && /work product|deliverable/i.test(ipText)) {
        // Only flag payment condition for work-for-hire, not SaaS
        risk = 'medium';
        reason = 'Work product ownership transfers without payment protection. Consider adding "upon full payment" condition.';
        financialRisk += 8;
      }
      
      clauses.push({
        id: clauseId++,
        title: 'Intellectual Property',
        text: ipText,
        risk,
        reason,
        category: 'Legal'
      });
    }

    // 6. AUTO-RENEWAL
    if (/auto.*renew|automatic.*renew|renew.*automatic/i.test(contentLower)) {
      const renewText = extractClauseText('renewal', ['renew', 'renewal', 'term']);
      const hasNoticeReq = /notice.*non-renew|non-renew.*notice|\d+\s*days.*before.*renewal/i.test(renewText || '');
      const hasOptOut = /opt.*out|cancel.*any.*time|may.*cancel/i.test(renewText || '');
      
      clauses.push({
        id: clauseId++,
        title: 'Auto-Renewal',
        text: renewText || 'Contract automatically renews.',
        risk: (hasNoticeReq || hasOptOut) ? 'low' : 'medium',
        reason: (hasNoticeReq || hasOptOut)
          ? 'Auto-renewal with cancellation option. This is standard subscription practice - you can cancel before renewal.'
          : 'Automatic renewal without clear cancellation process. Verify you can cancel before renewal to avoid unwanted charges.',
        category: 'Compliance'
      });
      
      if (!hasNoticeReq && !hasOptOut) complianceRisk += 12;
    }

    // 7. GOVERNING LAW (Standard boilerplate - always low risk)
    if (/governing law|governed by|jurisdiction/i.test(contentLower)) {
      const govText = extractClauseText('governing', ['governing law', 'governed by', 'jurisdiction']);
      clauses.push({
        id: clauseId++,
        title: 'Governing Law',
        text: govText || 'Governing law specified.',
        risk: 'low',
        reason: 'Standard governing law clause. Specifying jurisdiction is normal legal practice and provides clarity.',
        category: 'Compliance'
      });
    }

    // 8. DISPUTE RESOLUTION (Standard boilerplate - always low risk)
    if (/dispute|arbitration|mediation/i.test(contentLower)) {
      const disputeText = extractClauseText('dispute', ['dispute', 'arbitration', 'mediation']);
      const hasArbitration = /arbitration/i.test(disputeText || '');
      
      clauses.push({
        id: clauseId++,
        title: 'Dispute Resolution',
        text: disputeText || 'Dispute resolution mechanism specified.',
        risk: 'low',
        reason: hasArbitration
          ? 'Standard arbitration clause. This is common practice and often faster/cheaper than litigation.'
          : 'Dispute resolution process is defined, providing clear path for conflict resolution.',
        category: 'Legal'
      });
    }

    // 9. FORCE MAJEURE (Standard boilerplate - always low risk)
    if (/force majeure|act of god/i.test(contentLower)) {
      const forceText = extractClauseText('force', ['force majeure', 'act of god']);
      clauses.push({
        id: clauseId++,
        title: 'Force Majeure',
        text: forceText || 'Force majeure clause included.',
        risk: 'low',
        reason: 'Standard force majeure protection. This is boilerplate language that protects both parties from unforeseeable events.',
        category: 'Compliance'
      });
    }

    // 10. DATA PRIVACY (Standard boilerplate - always low risk when present)
    if (/data.*privacy|privacy.*data|gdpr|ccpa|personal.*data/i.test(contentLower)) {
      const dataText = extractClauseText('data', ['data', 'privacy', 'gdpr', 'ccpa', 'personal data']);
      const hasGDPR = /gdpr/i.test(dataText || '');
      const hasCCPA = /ccpa/i.test(dataText || '');
      
      clauses.push({
        id: clauseId++,
        title: 'Data Privacy',
        text: dataText || 'Data privacy terms included.',
        risk: 'low',
        reason: (hasGDPR || hasCCPA)
          ? 'Modern data privacy compliance (GDPR/CCPA). This demonstrates strong privacy commitment.'
          : 'Standard data privacy terms. This is basic protection found in most modern contracts.',
        category: 'Compliance'
      });
    }

    // Calculate overall safety (inverse of average risk)
    const avgRisk = (legalRisk + financialRisk + complianceRisk) / 3;
    const overallSafety = Math.max(10, Math.min(95, 100 - avgRisk));
    
    // Generate dynamic summary
    const highRiskClauses = clauses.filter(c => c.risk === 'high');
    const mediumRiskClauses = clauses.filter(c => c.risk === 'medium');
    const riskLevel = overallSafety >= 70 ? 'minimal' : overallSafety >= 50 ? 'moderate' : 'significant';
    
    let summary = `This ${wordCount}-word agreement contains ${riskLevel} legal and financial risk. `;
    
    if (highRiskClauses.length > 0) {
      summary += `${highRiskClauses.length} high-risk clause${highRiskClauses.length > 1 ? 's' : ''} detected: ${highRiskClauses.map(c => c.title).join(', ')}. `;
    }
    
    if (mediumRiskClauses.length > 0) {
      summary += `${mediumRiskClauses.length} medium-risk area${mediumRiskClauses.length > 1 ? 's' : ''} require attention. `;
    }
    
    if (overallSafety < 50) {
      summary += 'Significant concerns require immediate attention before signing.';
    } else if (overallSafety < 70) {
      summary += 'Several areas need careful review and negotiation before signing.';
    } else {
      summary += 'The contract appears relatively balanced, though standard legal review is recommended.';
    }

    // Generate dynamic suggestions based on actual risky clauses
    const suggestions = [];
    let sugId = 1;
    
    highRiskClauses.concat(mediumRiskClauses).slice(0, 4).forEach(clause => {
      if (clause.title.includes('Payment') && clause.text.includes('%')) {
        suggestions.push({
          id: sugId++,
          clause: clause.title,
          original: clause.text.substring(0, 150) + '...',
          improved: 'Late payments will incur a 1.5% monthly penalty (18% annually), consistent with industry standards and legal limits.',
          reason: 'Reduces excessive penalty to legally defensible and commercially reasonable rate.',
          impact: 'Reduces financial risk'
        });
      } else if (clause.title.includes('Termination') && clause.risk === 'high') {
        suggestions.push({
          id: sugId++,
          clause: clause.title,
          original: clause.text.substring(0, 150) + '...',
          improved: 'Either party may terminate this agreement with 60 days written notice, except for material breach which allows immediate termination with 15 days cure period.',
          reason: 'Provides reasonable notice period while preserving rights for breach situations.',
          impact: 'Improves stability'
        });
      } else if (clause.title.includes('Liability')) {
        suggestions.push({
          id: sugId++,
          clause: clause.title,
          original: clause.text.substring(0, 150) + '...',
          improved: "Liability shall be limited to the greater of (a) total fees paid under this agreement or (b) $250,000, except for gross negligence or willful misconduct.",
          reason: 'Establishes more balanced liability protection with meaningful coverage floor.',
          impact: 'Better risk allocation'
        });
      } else {
        suggestions.push({
          id: sugId++,
          clause: clause.title,
          original: clause.text.substring(0, 150) + '...',
          improved: `Add clear, balanced terms for ${clause.title.toLowerCase()} that protect both parties equally.`,
          reason: clause.reason,
          impact: 'Reduces legal risk'
        });
      }
    });

    return {
      fileName: name || 'Contract Document',
      summary,
      scores: {
        legal: Math.round(Math.min(legalRisk, 95)),
        financial: Math.round(Math.min(financialRisk, 95)),
        compliance: Math.round(Math.min(complianceRisk, 95)),
        overall: Math.round(overallSafety)
      },
      clauses,
      suggestions,
      recommendation: null // Will be set based on overall score
    };
  };

  const handleGenerateImprovement = () => {
    setIsGenerating(true);
    setGenerationStage(0);
    
    const interval = setInterval(() => {
      setGenerationStage(prev => {
        if (prev < generationStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setImprovedContract(generateImprovedContract());
            setIsGenerating(false);
            setShowImprovement(true);
          }, 500);
          return prev;
        }
      });
    }, 600);
  };

  const generateImprovedContract = () => {
    return {
      title: 'PROFESSIONAL SERVICES AGREEMENT',
      parties: {
        provider: 'Service Provider Inc.',
        client: 'Client Company LLC'
      },
      improvements: [
        {
          section: 'Payment Terms',
          original: 'Client shall pay Provider $10,000 per month. Late payments will incur a 5% penalty per month.',
          improved: 'Client shall pay Provider $10,000 per month, due within 15 days of invoice date. Late payments will incur a 1.5% monthly penalty (18% annually), consistent with applicable law.',
          reason: 'Clarifies payment timeline and reduces penalty to legal and reasonable rate'
        },
        {
          section: 'Termination',
          original: 'Either party may terminate at any time.',
          improved: 'Either party may terminate this Agreement with 60 days written notice. Immediate termination is permitted for material breach after 15 days cure period.',
          reason: 'Provides stability while preserving breach remedies'
        },
        {
          section: 'Liability',
          original: "Provider's liability limited to 3 months of fees.",
          improved: "Provider's liability shall be limited to the greater of (a) total fees paid under this Agreement or (b) $250,000, except for gross negligence or willful misconduct.",
          reason: 'Establishes balanced liability protection with meaningful coverage'
        }
      ],
      missingClauses: [
        {
          title: 'Dispute Resolution',
          content: 'Any disputes arising under this Agreement shall first be subject to good faith negotiation. If unresolved within 30 days, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.',
          reason: 'Provides clear dispute resolution process and avoids costly litigation'
        },
        {
          title: 'Force Majeure',
          content: 'Neither party shall be liable for failure to perform due to causes beyond reasonable control, including acts of God, war, strikes, or government restrictions.',
          reason: 'Protects both parties from liability for unforeseeable circumstances'
        },
        {
          title: 'Data Protection',
          content: 'Provider shall implement reasonable security measures to protect Client data and comply with applicable data protection laws including GDPR and CCPA where applicable.',
          reason: 'Addresses modern data privacy requirements and security obligations'
        }
      ],
      fullDraft: `PROFESSIONAL SERVICES AGREEMENT

This Professional Services Agreement ("Agreement") is entered into as of [DATE], by and between Service Provider Inc. ("Provider") and Client Company LLC ("Client").

1. SERVICES
Provider agrees to provide professional services as outlined in attached Statement of Work, including software development, consulting, and technical support services.

2. PAYMENT TERMS
Client shall pay Provider $10,000 per month, due within 15 days of invoice date. Late payments will incur a 1.5% monthly penalty (18% annually), consistent with applicable law. All fees are non-refundable except as expressly provided herein.

3. TERM AND TERMINATION
This Agreement shall commence on the date first written above and continue for an initial term of 12 months. Either party may terminate this Agreement with 60 days written notice. Immediate termination is permitted for material breach after 15 days written cure notice.

4. INTELLECTUAL PROPERTY
All work product and deliverables created by Provider shall become the exclusive property of Client upon full payment. Provider retains ownership of pre-existing materials and grants Client a perpetual license to use such materials.

5. CONFIDENTIALITY
Both parties agree to maintain strict confidentiality of all proprietary information disclosed during the term of this Agreement. This obligation survives termination for a period of 3 years.

6. LIABILITY AND INDEMNIFICATION
Provider's liability shall be limited to the greater of (a) total fees paid under this Agreement or (b) $250,000, except for gross negligence or willful misconduct. Each party shall indemnify the other against third-party claims arising from its breach of this Agreement.

7. DATA PROTECTION
Provider shall implement reasonable security measures to protect Client data and comply with applicable data protection laws including GDPR and CCPA where applicable.

8. DISPUTE RESOLUTION
Any disputes arising under this Agreement shall first be subject to good faith negotiation. If unresolved within 30 days, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.

9. FORCE MAJEURE
Neither party shall be liable for failure to perform due to causes beyond reasonable control, including acts of God, war, strikes, or government restrictions.

10. GENERAL PROVISIONS
This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements. This Agreement may only be modified in writing signed by both parties. This Agreement shall be governed by the laws of [STATE/JURISDICTION].

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

SERVICE PROVIDER INC.                    CLIENT COMPANY LLC

_________________________              _________________________
Authorized Signature                    Authorized Signature

_________________________              _________________________
Print Name                              Print Name

_________________________              _________________________
Date                                    Date`
    };
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadContract = (format) => {
    // Safety check
    if (!improvedContract || !improvedContract.fullDraft) {
      alert('Please generate an improved contract first.');
      return;
    }

    try {
      if (format === 'PDF') {
        downloadAsPDF();
      } else if (format === 'DOCX') {
        downloadAsDOCX();
      }
    } catch (error) {
      console.error('Download error:', error);
      alert(`Error generating ${format}. Please try again.`);
    }
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('AI-IMPROVED CONTRACT', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Contract content
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const contractText = improvedContract.fullDraft || '';
    const lines = doc.splitTextToSize(contractText, maxWidth);
    
    lines.forEach((line) => {
      // Check if we need a new page
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      
      // Check if line is a heading (all caps or starts with number)
      if (/^[A-Z\s]{10,}$/.test(line.trim()) || /^\d+\./.test(line.trim())) {
        doc.setFont('helvetica', 'bold');
        doc.text(line, margin, yPosition);
        doc.setFont('helvetica', 'normal');
      } else {
        doc.text(line, margin, yPosition);
      }
      
      yPosition += 6;
    });

    // Footer on last page
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Generated by ContractIQ AI', pageWidth / 2, pageHeight - 10, { align: 'center' });
      doc.text('AI-Assisted Contract Optimization', pageWidth / 2, pageHeight - 6, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    }

    // Save the PDF
    doc.save('ContractIQ_Improved_Contract.pdf');
  };

  const downloadAsDOCX = async () => {
    const contractText = improvedContract.fullDraft || '';
    const lines = contractText.split('\n');
    
    const paragraphs = lines.map(line => {
      const trimmedLine = line.trim();
      
      // Check if it's a heading (all caps or starts with number)
      if (/^[A-Z\s]{10,}$/.test(trimmedLine) || /^\d+\./.test(trimmedLine)) {
        return new Paragraph({
          text: trimmedLine,
          heading: HeadingLevel.HEADING_2,
          spacing: {
            before: 240,
            after: 120
          }
        });
      } else if (trimmedLine === '') {
        return new Paragraph({
          text: '',
          spacing: {
            before: 120,
            after: 120
          }
        });
      } else {
        return new Paragraph({
          children: [
            new TextRun({
              text: trimmedLine,
              size: 22
            })
          ],
          spacing: {
            before: 60,
            after: 60
          }
        });
      }
    });

    // Add title at the beginning
    paragraphs.unshift(
      new Paragraph({
        text: 'AI-IMPROVED CONTRACT',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 400
        }
      })
    );

    // Add footer
    paragraphs.push(
      new Paragraph({
        text: '',
        spacing: { before: 400 }
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: 'Generated by ContractIQ AI',
            size: 18,
            color: '808080'
          })
        ],
        alignment: AlignmentType.CENTER
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: 'AI-Assisted Contract Optimization',
            size: 18,
            color: '808080'
          })
        ],
        alignment: AlignmentType.CENTER
      })
    );

    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'ContractIQ_Improved_Contract.docx');
  };

  // Advanced Conversational AI Logic
  const generateAIResponse = (question, conversationHistory = []) => {
    const q = question.toLowerCase();
    
    // Safety check
    if (!analysis) {
      return "I'm still analyzing your contract. Please wait a moment for the analysis to complete, then I'll be happy to answer your questions.";
    }

    // Extract analysis data
    const overallScore = analysis?.scores?.overall || 50;
    const legalRisk = analysis?.scores?.legal || 30;
    const financialRisk = analysis?.scores?.financial || 30;
    const complianceRisk = analysis?.scores?.compliance || 30;
    const summary = analysis?.summary || '';
    const recommendation = analysis?.recommendation || {};
    
    const highRiskClauses = (analysis?.clauses || []).filter(c => c.risk === 'high');
    const mediumRiskClauses = (analysis?.clauses || []).filter(c => c.risk === 'medium');
    const lowRiskClauses = (analysis?.clauses || []).filter(c => c.risk === 'low');
    const allClauses = analysis?.clauses || [];
    const suggestions = analysis?.suggestions || [];

    // Context from previous conversation
    const lastUserMessage = conversationHistory.filter(m => m.type === 'user').slice(-2, -1)[0]?.text?.toLowerCase() || '';
    
    // 1. FOLLOW-UP QUESTIONS (Why? How?)
    if ((q === 'why' || q === 'why?' || q.includes('why is that') || q.includes('how so')) && lastUserMessage) {
      if (lastUserMessage.includes('risk')) {
        if (highRiskClauses.length > 0) {
          const clause = highRiskClauses[0];
          return `The risk comes from how the clause is worded. ${clause.reason} In practical terms, this means if something goes wrong, you might have limited recourse or face unexpected obligations.`;
        }
      }
      if (lastUserMessage.includes('payment') || lastUserMessage.includes('money')) {
        return `Payment terms are risky when they're either unclear or heavily penalize you. For example, excessive late fees (like 5% monthly = 60% annually) are often unenforceable and indicate an imbalanced agreement.`;
      }
      if (lastUserMessage.includes('sign')) {
        return `My recommendation is based on the overall safety score of ${overallScore}%. ${overallScore < 50 ? 'With a score this low, signing could expose you to significant problems.' : overallScore < 70 ? 'The score suggests caution - worth negotiating.' : 'The score indicates relatively standard terms.'}`;
      }
      return `Let me clarify: ${summary.split('.')[0]}. The key concern is ensuring you understand all obligations before committing.`;
    }

    // 2. WHAT HAPPENS IF I SIGN
    if (q.includes('what happens if') || q.includes('what will happen') || q.includes('consequences') ||
        q.includes('if i sign') || q.includes('after signing') || q.includes('future')) {
      const risks = [];
      if (highRiskClauses.length > 0) {
        highRiskClauses.forEach(clause => {
          if (clause.title.toLowerCase().includes('payment')) risks.push('You could face steep penalties for late payments');
          if (clause.title.toLowerCase().includes('termination')) risks.push('They could terminate suddenly without adequate notice');
          if (clause.title.toLowerCase().includes('liability')) risks.push('Your ability to recover damages would be severely limited');
          if (clause.title.toLowerCase().includes('renewal')) risks.push('The contract could auto-renew, locking you in');
        });
      }
      
      if (risks.length > 0) {
        return `If you sign this contract as-is, here's what could realistically happen:\n\n${risks.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\n${overallScore < 50 ? 'I strongly recommend negotiating these terms before signing.' : 'Consider addressing these points to protect yourself.'}`;
      }
      return `If you sign, you'll be bound by standard terms that appear relatively balanced. Overall safety score is ${overallScore}%, which suggests ${overallScore >= 70 ? 'minimal risk' : 'some areas worth reviewing'}.`;
    }

    // 3. CAN THEY TERMINATE ME
    if (q.includes('terminate') || q.includes('fire') || q.includes('cancel') || q.includes('end contract') || q.includes('kick me out')) {
      const terminationClause = allClauses.find(c => c.title.toLowerCase().includes('termination'));
      if (terminationClause) {
        if (terminationClause.risk === 'high') {
          return `Yes, and that's a major concern. ${terminationClause.reason} They could potentially end the agreement with little warning. I'd strongly recommend negotiating for a longer notice period - at least 30-60 days is standard.`;
        } else if (terminationClause.text.includes('30 days') || terminationClause.text.includes('notice')) {
          return `The contract requires 30 days written notice for termination, which is standard and provides reasonable protection. This gives you time to prepare if they decide to end the agreement.`;
        }
      }
      return `Based on the termination clause, ${legalRisk > 50 ? 'there are concerns about how easily they can end the contract.' : 'the terms appear relatively balanced with standard notice requirements.'}`;
    }

    // 4. PAYMENT / MONEY QUESTIONS
    if (q.includes('payment') || q.includes('pay') || q.includes('money') || q.includes('fee') ||
        q.includes('cost') || q.includes('price') || q.includes('how much')) {
      const paymentClause = allClauses.find(c => c.title.toLowerCase().includes('payment'));
      
      if (q.includes('how much') || q.includes('cost')) {
        if (paymentClause && paymentClause.text.includes('$')) {
          const amount = paymentClause.text.match(/\$[\d,]+/)?.[0] || 'the specified amount';
          return `According to the contract, you'll pay ${amount} per month. ${financialRisk > 50 ? `However, there's a ${financialRisk}% financial risk score. ` : ''}${paymentClause.text.includes('penalty') ? 'Watch out for the late payment penalties.' : ''}`;
        }
        return `The contract specifies payment terms. Financial risk score is ${financialRisk}%, ${financialRisk > 50 ? 'which suggests the terms may be unfavorable' : 'which seems reasonable'}.`;
      }
      
      if (financialRisk >= 60) {
        return `The payment terms are concerning - financial risk is ${financialRisk}%. ${paymentClause ? `The issue is: ${paymentClause.reason}` : 'There may be excessive penalties or unclear schedules.'} This could mean unexpected costs. I'd recommend negotiating clearer terms.`;
      } else if (financialRisk >= 40) {
        return `Payment terms are moderate with ${financialRisk}% financial risk. ${paymentClause ? paymentClause.reason : 'Make sure you understand all payment obligations before committing.'}`;
      }
      return `The payment terms look reasonable with only ${financialRisk}% financial risk. ${paymentClause ? 'The terms appear fair and standard.' : 'Standard payment provisions with no major red flags.'}`;
    }

    // 5. HIDDEN RISKS
    if (q.includes('hidden') || q.includes('danger') || q.includes('trap') || q.includes('catch') ||
        q.includes('watch out') || q.includes('careful')) {
      const hiddenRisks = [];
      allClauses.forEach(clause => {
        if (clause.text.toLowerCase().includes('auto') && clause.text.toLowerCase().includes('renew')) {
          hiddenRisks.push('**Auto-renewal**: Contract renews automatically - easy to forget');
        }
        if (clause.text.toLowerCase().includes('indemnif')) {
          hiddenRisks.push('**Indemnification**: You might cover their legal costs');
        }
        if (clause.risk === 'high' && !hiddenRisks.some(r => r.includes(clause.title))) {
          hiddenRisks.push(`**${clause.title}**: ${clause.reason.split('.')[0]}`);
        }
      });
      
      if (hiddenRisks.length > 0) {
        return `Here are the hidden risks that could catch you off guard:\n\n${hiddenRisks.slice(0, 4).join('\n\n')}\n\n${overallScore < 50 ? 'I strongly advise legal review before signing.' : 'Worth discussing these before you commit.'}`;
      }
      return `I've analyzed the contract thoroughly. ${highRiskClauses.length > 0 ? `The ${highRiskClauses.length} high-risk clause${highRiskClauses.length > 1 ? 's' : ''} should be your primary concern.` : 'No major hidden traps detected.'}`;
    }

    // 6. LOSE MONEY
    if (q.includes('lose money') || q.includes('lose cash') || q.includes('financial loss') ||
        q.includes('cost me') || q.includes('expensive')) {
      if (financialRisk >= 60) {
        return `Yes, there's real financial risk here (${financialRisk}% score). You could lose money through excessive penalties, unclear refund policies, or inadequate liability caps. I'd recommend negotiating better financial protections.`;
      } else if (financialRisk >= 40) {
        return `There's moderate financial risk (${financialRisk}%). You might face some unexpected costs. Ensure you understand all payment obligations and penalties.`;
      }
      return `Financial risk is relatively low at ${financialRisk}%. As long as you meet your payment obligations on time, you shouldn't face unexpected losses.`;
    }

    // 7. WHO HAS MORE POWER
    if (q.includes('power') || q.includes('balanced') || q.includes('fair') || q.includes('favor') ||
        q.includes('one-sided') || q.includes('biased')) {
      const imbalances = [];
      if (legalRisk > 50) imbalances.push('legal terms favor the other party');
      if (financialRisk > 50) imbalances.push('financial terms are skewed against you');
      if (highRiskClauses.length > 2) imbalances.push('multiple high-risk clauses create power imbalance');
      
      if (imbalances.length >= 2) {
        return `This contract is **not balanced** - it clearly favors the other party. ${imbalances.join(', ')}. ${overallScore < 50 ? 'I strongly recommend renegotiating or walking away.' : 'Consider negotiating key clauses.'}`;
      } else if (imbalances.length === 1) {
        return `The contract leans somewhat in their favor, particularly regarding ${imbalances[0]}. You'd benefit from negotiating better terms.`;
      }
      return `The contract appears relatively balanced with an ${overallScore}% safety score. ${overallScore >= 70 ? 'This is actually pretty fair.' : 'While not perfect, it is not heavily skewed.'}`;
    }

    // 8. LEGALLY SAFE
    if (q.includes('legal') || q.includes('legally safe') || q.includes('law') || q.includes('court')) {
      if (legalRisk >= 60) {
        return `From a legal standpoint, there are significant concerns (${legalRisk}% legal risk). These issues could lead to disputes or leave you unprotected. I strongly recommend having a lawyer review this.`;
      } else if (legalRisk >= 40) {
        return `Legal risk is moderate at ${legalRisk}%. The contract has some concerning clauses. A legal professional could help you understand the implications.`;
      }
      return `From a legal perspective, this contract is relatively safe with only ${legalRisk}% legal risk. Still, having a lawyer review any contract is always good practice.`;
    }

    // 9. SIMPLE EXPLANATION
    if (q.includes('explain simply') || q.includes('simple terms') || q.includes('eli5') ||
        q.includes('plain english') || q.includes('layman')) {
      const advice = overallScore >= 70 ? 'Relatively safe, but get a lawyer to review it.' : overallScore >= 45 ? 'Do not sign without negotiating the risky parts first.' : 'This has serious problems - consider walking away.';
      return `Let me break this down simply:\n\n**What you are agreeing to**: ${summary.split('.')[0]}.\n\n**Main risks**: ${highRiskClauses.length > 0 ? highRiskClauses.map(c => c.title).join(', ') : 'Minimal'}.\n\n**My advice**: ${advice}`;
    }

    // 10. NEGOTIATION
    if (q.includes('negotiate') || q.includes('change') || q.includes('improve') || q.includes('fix')) {
      if (suggestions.length > 0) {
        const topSuggestions = suggestions.slice(0, 3);
        return `Here's what you should negotiate:\n\n${topSuggestions.map((s, i) => `**${i + 1}. ${s.clause}**\n${s.reason}`).join('\n\n')}\n\nThese changes would significantly reduce your risk.`;
      }
      return `Focus on negotiating:\n\n1. **Payment terms** - Ensure clarity\n2. **Termination notice** - Get adequate time\n3. **Liability limits** - Make sure they're fair\n4. **Auto-renewal** - Add clear cancellation procedures`;
    }

    // 11. BIGGEST RISK
    if (q.includes('biggest') || q.includes('main') || q.includes('major') || q.includes('worst')) {
      if (highRiskClauses.length > 0) {
        const topRisk = highRiskClauses[0];
        return `Your biggest concern is the **${topRisk.title}**. ${topRisk.reason}\n\nThis could ${topRisk.category === 'Financial' ? 'cost you significant money' : topRisk.category === 'Legal' ? 'leave you legally exposed' : 'create compliance issues'}. ${overallScore < 50 ? 'This alone is reason to reconsider signing.' : 'I strongly recommend addressing this first.'}`;
      } else if (mediumRiskClauses.length > 0) {
        return `The main concerns are: ${mediumRiskClauses.map(c => c.title).join(', ')}. While not critical, these could cause problems if not addressed.`;
      }
      return `Good news - no major risks detected! Overall safety score is ${overallScore}%. Still, I recommend standard legal review.`;
    }

    // 12. SHOULD I SIGN
    if (q.includes('should i sign') || q.includes('can i sign') || q.includes('safe to sign') ||
        q.includes('recommend') || q.includes('advice')) {
      const action = recommendation.action || '';
      if (overallScore >= 70) {
        return `**My recommendation: You can proceed**, but with standard legal review.\n\nWith a ${overallScore}% safety score, this contract has minimal risks. The terms appear balanced.\n\nThat said, always have a lawyer review any contract before signing.`;
      } else if (overallScore >= 45) {
        return `**My recommendation: Review carefully before signing.**\n\nThis contract has a ${overallScore}% safety score with several concerning areas. ${highRiskClauses.length > 0 ? `${highRiskClauses.length} high-risk clause${highRiskClauses.length > 1 ? 's' : ''} need attention.` : ''}\n\n${action}\n\nDon't sign as-is. Negotiate the flagged terms first.`;
      }
      return `**My recommendation: Do NOT sign this as-is.**\n\nWith only a ${overallScore}% safety score, this contract has significant problems. ${highRiskClauses.length > 0 ? `${highRiskClauses.length} high-risk clauses detected.` : ''}\n\n${action}\n\nEither renegotiate major terms or consider walking away.`;
    }

    // DEFAULT
    return `I'm here to help you understand your contract. Based on my analysis:\n\n• **Overall Safety**: ${overallScore}%\n• **Risk Level**: ${overallScore >= 70 ? 'Low' : overallScore >= 45 ? 'Moderate' : 'High'}\n• **Key Concerns**: ${highRiskClauses.length > 0 ? highRiskClauses.map(c => c.title).join(', ') : 'None major'}\n\nYou can ask me:\n• "What happens if I sign this?"\n• "Can they terminate me suddenly?"\n• "Is this payment safe?"\n• "What are the hidden risks?"\n• "Should I sign this contract?"\n\nWhat would you like to know?`;
  };

  const handleSendMessage = (messageText = null) => {
    const message = messageText || chatInput.trim();
    if (!message) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: message,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI thinking and generate response with conversation context
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: generateAIResponse(message, chatMessages),
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Scroll to bottom
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1000 + Math.random() * 1000); // Random delay 1-2 seconds
  };

  const quickQuestions = [
    "What is my biggest risk?",
    "Should I sign this contract?",
    "Explain this clause simply",
    "What should I negotiate?",
    "Is this payment term safe?",
    "Summarize the biggest concerns"
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Set recommendation based on overall score
  useEffect(() => {
    if (analysis && analysis.scores) {
      const score = analysis.scores.overall;
      if (score >= 70) {
        analysis.recommendation = {
          status: 'safe',
          title: 'Safe to Sign',
          message: 'This contract has been analyzed and appears to have minimal risks. Standard terms and conditions are present with no major red flags detected by our AI analysis.',
          action: 'You may proceed with signing after standard legal review. Consider the minor suggestions provided for optimization.'
        };
      } else if (score >= 45) {
        analysis.recommendation = {
          status: 'review',
          title: 'Review Required Before Signing',
          message: 'This contract contains several areas of concern that require careful review. Multiple clauses have been flagged for potential risks that could impact your interests.',
          action: 'Professional legal review strongly recommended before signing. Consider negotiating the flagged clauses using our AI suggestions.'
        };
      } else {
        analysis.recommendation = {
          status: 'high-risk',
          title: 'High Risk - Do Not Sign',
          message: 'This contract contains significant risks and problematic clauses that could expose you to substantial liability and unfavorable terms. Multiple high-risk issues detected.',
          action: 'Do not sign without thorough legal review. Strong recommendation to renegotiate terms or seek alternative agreements.'
        };
      }
    }
  }, [analysis]);

  if (isLoading) {
    const currentStage = loadingStages[loadingStage];
    const StageIcon = currentStage.icon;
    
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            key={loadingStage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 mx-auto mb-8 relative"
          >
            <div className="absolute inset-0 bg-ibm-blue/20 rounded-full animate-ping" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-ibm-blue to-ibm-blue-600 rounded-full flex items-center justify-center">
              <StageIcon className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.h2
              key={loadingStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl font-bold text-white mb-4"
            >
              {currentStage.text}
            </motion.h2>
          </AnimatePresence>
          
          <div className="flex justify-center space-x-2 mb-4">
            {loadingStages.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index <= loadingStage ? 'w-8 bg-ibm-blue' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
          
          <p className="text-dark-400">Powered by IBM Watson AI</p>
        </motion.div>
      </div>
    );
  }

  if (isGenerating) {
    const currentStage = generationStages[generationStage];
    const StageIcon = currentStage.icon;
    
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            key={generationStage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 mx-auto mb-8 relative"
          >
            <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center">
              <StageIcon className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.h2
              key={generationStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl font-bold text-white mb-4"
            >
              {currentStage.text}
            </motion.h2>
          </AnimatePresence>
          
          <div className="flex justify-center space-x-2 mb-4">
            {generationStages.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index <= generationStage ? 'w-8 bg-success' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
          
          <p className="text-dark-400">AI Contract Optimization in Progress</p>
        </motion.div>
      </div>
    );
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-danger';
      default: return 'text-dark-400';
    }
  };

  const getRiskBg = (risk) => {
    switch (risk) {
      case 'low': return 'bg-success/10 border-success/30';
      case 'medium': return 'bg-warning/10 border-warning/30';
      case 'high': return 'bg-danger/10 border-danger/30';
      default: return 'bg-white/5 border-white/10';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'low': return CheckCircle;
      case 'medium': return AlertTriangle;
      case 'high': return XCircle;
      default: return AlertTriangle;
    }
  };

  const getRecommendationStyle = (status) => {
    switch (status) {
      case 'safe':
        return {
          bg: 'bg-success/10 border-success/30',
          icon: CheckCircle,
          iconColor: 'text-success'
        };
      case 'review':
        return {
          bg: 'bg-warning/10 border-warning/30',
          icon: AlertTriangle,
          iconColor: 'text-warning'
        };
      case 'high-risk':
        return {
          bg: 'bg-danger/10 border-danger/30',
          icon: XCircle,
          iconColor: 'text-danger'
        };
      default:
        return {
          bg: 'bg-white/5 border-white/10',
          icon: AlertTriangle,
          iconColor: 'text-dark-400'
        };
    }
  };

  // Safety check: ensure analysis and recommendation exist before using
  const recStyle = analysis?.recommendation?.status
    ? getRecommendationStyle(analysis.recommendation.status)
    : getRecommendationStyle('review'); // Default fallback

  if (showImprovement && improvedContract) {
    return (
      <div className="min-h-screen gradient-bg">
        <div className="container-custom py-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowImprovement(false)}
            className="flex items-center space-x-2 text-dark-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Analysis</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">AI-Improved Contract</span>
            </h1>
            <p className="text-dark-400">Professional contract draft with optimized clauses</p>
          </motion.div>

          <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* Clause Improvements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-4">Clause Improvements</h2>
              <div className="space-y-6">
                {improvedContract.improvements.map((improvement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="glass rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-ibm-blue" />
                      <span>{improvement.section}</span>
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-danger mb-2 font-semibold">❌ Original (Risky):</p>
                        <p className="text-dark-300 bg-danger/5 border border-danger/20 rounded-lg p-4">
                          {improvement.original}
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-ibm-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-success mb-2 font-semibold">✅ Improved (Safer):</p>
                        <p className="text-white bg-success/5 border border-success/20 rounded-lg p-4">
                          {improvement.improved}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-white/10">
                        <p className="text-sm text-dark-400">
                          <span className="font-semibold text-ibm-blue">Why this is better:</span> {improvement.reason}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Missing Clauses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Added Professional Clauses</h2>
              <div className="space-y-4">
                {improvedContract.missingClauses.map((clause, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="glass rounded-xl p-6 border border-success/30"
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{clause.title}</h3>
                        <p className="text-dark-200 mb-3">{clause.content}</p>
                        <p className="text-sm text-dark-400">
                          <span className="font-semibold text-success">Added because:</span> {clause.reason}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Full Contract Draft */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Complete Professional Contract</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(improvedContract.fullDraft)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => downloadContract('PDF')}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={() => downloadContract('DOCX')}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>DOCX</span>
                  </button>
                </div>
              </div>
              <div className="bg-dark-900/50 rounded-lg p-6 border border-white/10">
                <pre className="text-dark-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {improvedContract.fullDraft}
                </pre>
              </div>
              <div className="mt-6 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                <p className="text-sm text-dark-300">
                  <span className="font-semibold text-warning">⚠️ Legal Disclaimer:</span> This is an AI-assisted professional contract draft. 
                  While our AI has optimized the language and structure, this should be reviewed by a qualified attorney before use. 
                  This tool does not provide legal advice and should not replace professional legal counsel.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Safety check: if analysis is still null after loading, show error
  if (!isLoading && !analysis) {
    console.error('Analysis is null after loading completed');
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Analysis Error</h2>
          <p className="text-dark-300 mb-6">
            Unable to generate contract analysis. Please try again.
          </p>
          <button
            onClick={() => navigate('/upload')}
            className="btn-primary"
          >
            Back to Upload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="container-custom py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/upload')}
          className="flex items-center space-x-2 text-dark-300 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Upload</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between flex-wrap gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Analysis <span className="gradient-text">Dashboard</span>
            </h1>
            <div className="flex items-center space-x-2 text-dark-400">
              <FileText className="w-4 h-4" />
              <span>{analysis?.fileName || 'Contract Document'}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/upload')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Another</span>
          </button>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container-custom pb-20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Trust Score Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-400">Contract Trust Score</span>
                <Shield className="w-4 h-4 text-ibm-blue" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold gradient-text">{analysis?.scores?.overall || 0}</span>
                <span className="text-xl text-dark-400">/100</span>
              </div>
              <div className="mt-2 h-2 bg-dark-900/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analysis?.scores?.overall || 0}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-full rounded-full ${
                    (analysis?.scores?.overall || 0) >= 70 ? 'bg-success' :
                    (analysis?.scores?.overall || 0) >= 45 ? 'bg-warning' : 'bg-danger'
                  }`}
                />
              </div>
            </motion.div>

            {/* Complexity Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-400">Contract Complexity</span>
                <Scale className="w-4 h-4 text-ibm-blue" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-4xl font-bold text-white">
                  {(analysis?.clauses?.length || 0) <= 3 ? 'Low' :
                   (analysis?.clauses?.length || 0) <= 6 ? 'Medium' : 'High'}
                </span>
              </div>
              <p className="text-sm text-dark-400 mt-2">
                {analysis?.clauses?.length || 0} clauses analyzed
              </p>
            </motion.div>

            {/* Reading Time Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-dark-400">Reading Time</span>
                <FileText className="w-4 h-4 text-ibm-blue" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-white">
                  {Math.ceil((finalContractText?.length || 0) / 1000)}
                </span>
                <span className="text-xl text-dark-400">min</span>
              </div>
              <p className="text-sm text-dark-400 mt-2">
                {(finalContractText?.length || 0).toLocaleString()} characters
              </p>
            </motion.div>
          </motion.div>

          {/* Top 3 Risks */}
          {((analysis?.clauses || []).filter(c => c.risk === 'high' || c.risk === 'medium').length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="glass rounded-xl p-6 border-l-4 border-danger"
            >
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-danger" />
                <h3 className="text-lg font-bold">Top Risks Detected</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(analysis?.clauses || [])
                  .filter(c => c.risk === 'high' || c.risk === 'medium')
                  .slice(0, 3)
                  .map((clause, index) => (
                    <motion.div
                      key={clause.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        clause.risk === 'high' ? 'bg-danger/20' : 'bg-warning/20'
                      }`}>
                        <span className={`text-sm font-bold ${
                          clause.risk === 'high' ? 'text-danger' : 'text-warning'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{clause.title}</p>
                        <p className="text-xs text-dark-400 mt-1 line-clamp-2">{clause.reason.split('.')[0]}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Executive Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-ibm-blue" />
              <h2 className="text-2xl font-bold">AI Executive Summary</h2>
            </div>
            <p className="text-dark-300 leading-relaxed text-lg">{analysis?.summary || 'No summary available'}</p>
          </motion.div>

          {/* Risk Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4">Risk Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ScoreCard
                title="Legal Risk"
                score={analysis?.scores?.legal || 0}
                icon={Scale}
                color="text-ibm-blue"
                isRisk={true}
              />
              <ScoreCard
                title="Financial Risk"
                score={analysis?.scores?.financial || 0}
                icon={DollarSign}
                color="text-warning"
                isRisk={true}
              />
              <ScoreCard
                title="Compliance Risk"
                score={analysis?.scores?.compliance || 0}
                icon={Shield}
                color="text-danger"
                isRisk={true}
              />
              <ScoreCard
                title="Overall Safety"
                score={analysis?.scores?.overall || 0}
                icon={TrendingUp}
                color="text-success"
                highlight
                isRisk={false}
              />
            </div>
          </motion.div>

          {/* Risky Clauses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Detailed Clause Analysis</h2>
            <div className="space-y-4">
              {(analysis?.clauses || []).map((clause, index) => {
                const RiskIcon = getRiskIcon(clause.risk);
                return (
                  <motion.div
                    key={clause.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`glass rounded-xl p-6 border ${getRiskBg(clause.risk)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <RiskIcon className={`w-6 h-6 ${getRiskColor(clause.risk)}`} />
                        <div>
                          <h3 className="text-lg font-bold text-white">{clause.title}</h3>
                          <span className="text-sm text-dark-400">{clause.category}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(clause.risk)} bg-white/5`}>
                        {clause.risk.toUpperCase()} RISK
                      </span>
                    </div>
                    <p className="text-dark-300 mb-3 italic border-l-2 border-white/20 pl-4">"{clause.text}"</p>
                    <p className="text-sm text-dark-400">
                      <span className="font-semibold text-white">AI Analysis:</span> {clause.reason}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Negotiation Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-4">AI Negotiation Suggestions</h2>
            <div className="space-y-4">
              {(analysis?.suggestions || []).map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass rounded-xl p-6"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-ibm-blue" />
                    <h3 className="text-lg font-bold">Suggestion #{suggestion.id}</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-danger mb-2 font-semibold">Original Clause:</p>
                      <p className="text-dark-300 bg-danger/5 border border-danger/20 rounded-lg p-3">
                        {suggestion.original}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-ibm-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-success mb-2 font-semibold">Improved Clause:</p>
                      <p className="text-white bg-success/5 border border-success/20 rounded-lg p-3">
                        {suggestion.improved}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <p className="text-sm text-dark-400">{suggestion.reason}</p>
                      <span className="text-xs px-3 py-1 bg-ibm-blue/10 text-ibm-blue rounded-full">
                        {suggestion.impact}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Contract Improvement CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-8 border-2 border-ibm-blue/30"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-ibm-blue/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-ibm-blue" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Contract Improvement</h2>
                <p className="text-dark-400">Generate a professionally optimized version</p>
              </div>
            </div>
            <p className="text-lg text-dark-200 mb-6">
              We found risky and unclear clauses in your contract. Would you like our AI to generate 
              a safer and professionally optimized version with improved legal language?
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleGenerateImprovement}
                className="btn-primary flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generate Improved Contract</span>
              </button>
              <button className="btn-secondary">
                Keep Original Contract
              </button>
            </div>
          </motion.div>

          {/* Final Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`glass rounded-2xl p-8 border-2 ${recStyle.bg}`}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-20 h-20 rounded-full ${recStyle.bg} flex items-center justify-center`}>
                <recStyle.icon className={`w-10 h-10 ${recStyle.iconColor}`} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{analysis?.recommendation?.title || 'Analysis Complete'}</h2>
                <p className="text-dark-400 text-lg">Final AI Recommendation</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-dark-400 mb-2">Analysis Result:</p>
                <p className="text-lg text-dark-200">{analysis?.recommendation?.message || 'Contract analysis completed.'}</p>
              </div>
              <div className="pt-4 border-t border-white/20">
                <p className="text-sm text-dark-400 mb-2">Recommended Action:</p>
                <p className="text-white font-semibold text-lg">{analysis?.recommendation?.action || 'Review the analysis details above.'}</p>
              </div>
            </div>
          </motion.div>

          {/* Compliance Checker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-6 h-6 text-ibm-blue" />
              <h2 className="text-2xl font-bold">🛡 Compliance Checker</h2>
            </div>
            <p className="text-dark-400 mb-6">
              AI-powered legal standards and contract completeness validation
            </p>

            {/* Contract Type Detection */}
            <div className="mb-6 p-4 bg-ibm-blue/10 border border-ibm-blue/30 rounded-lg">
              <p className="text-sm text-dark-400 mb-1">Detected Contract Type:</p>
              <p className="text-lg font-semibold text-white">
                {(() => {
                  const text = finalContractText.toLowerCase();
                  if (text.includes('freelance') || text.includes('independent contractor')) return 'Freelance Agreement';
                  if (text.includes('non-disclosure') || text.includes('nda') || text.includes('confidentiality agreement')) return 'Non-Disclosure Agreement (NDA)';
                  if (text.includes('employment') || text.includes('employee')) return 'Employment Agreement';
                  if (text.includes('vendor') || text.includes('supplier')) return 'Vendor Agreement';
                  if (text.includes('service') || text.includes('consulting')) return 'Service Agreement';
                  if (text.includes('lease') || text.includes('rental')) return 'Lease Agreement';
                  if (text.includes('partnership')) return 'Partnership Agreement';
                  return 'Service Agreement';
                })()}
              </p>
            </div>

            {/* Compliance Score */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Compliance Score</h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-ibm-blue">
                    {(() => {
                      const clauses = analysis?.clauses || [];
                      const highRisk = clauses.filter(c => c.risk === 'high').length;
                      const mediumRisk = clauses.filter(c => c.risk === 'medium').length;
                      const lowRisk = clauses.filter(c => c.risk === 'low').length;
                      const total = clauses.length || 8;
                      
                      // Calculate score based on clause risks
                      const score = Math.round(((lowRisk * 100 + mediumRisk * 60 + highRisk * 20) / total));
                      return Math.min(Math.max(score, 0), 100);
                    })()}
                    <span className="text-lg text-dark-400">/100</span>
                  </div>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-dark-400">Status:</span>
                {(() => {
                  const clauses = analysis?.clauses || [];
                  const highRisk = clauses.filter(c => c.risk === 'high').length;
                  const mediumRisk = clauses.filter(c => c.risk === 'medium').length;
                  const total = clauses.length || 8;
                  const score = Math.round(((clauses.filter(c => c.risk === 'low').length * 100 + mediumRisk * 60 + highRisk * 20) / total));
                  
                  if (score >= 75) {
                    return (
                      <span className="px-3 py-1 bg-success/10 border border-success/30 text-success rounded-full text-sm font-semibold flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>✅ Compliant</span>
                      </span>
                    );
                  } else if (score >= 50) {
                    return (
                      <span className="px-3 py-1 bg-warning/10 border border-warning/30 text-warning rounded-full text-sm font-semibold flex items-center space-x-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>⚠️ Partially Compliant</span>
                      </span>
                    );
                  } else {
                    return (
                      <span className="px-3 py-1 bg-danger/10 border border-danger/30 text-danger rounded-full text-sm font-semibold flex items-center space-x-1">
                        <XCircle className="w-4 h-4" />
                        <span>❌ High Compliance Risk</span>
                      </span>
                    );
                  }
                })()}
              </div>

              <p className="text-sm text-dark-400">
                Score based on clause completeness, legal balance, missing protections, payment clarity, and termination fairness.
              </p>
            </div>

            {/* Required Clause Validation */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Required Clause Validation</h3>
              <div className="space-y-3">
                {(() => {
                  const text = finalContractText.toLowerCase();
                  const clauses = analysis?.clauses || [];
                  
                  const clauseChecks = [
                    {
                      name: 'Payment Terms',
                      present: text.includes('payment') || text.includes('fee') || text.includes('compensation'),
                      status: text.includes('payment') && (text.includes('$') || text.includes('dollar')) ? 'complete' : text.includes('payment') ? 'partial' : 'missing',
                      explanation: text.includes('payment') && text.includes('$')
                        ? 'Payment terms are clearly defined with specific amounts.'
                        : text.includes('payment')
                        ? 'Payment terms exist but may lack clarity on amounts or schedules.'
                        : 'Payment terms are not clearly specified in the contract.'
                    },
                    {
                      name: 'Confidentiality',
                      present: text.includes('confidential') || text.includes('proprietary'),
                      status: text.includes('confidential') ? 'complete' : 'missing',
                      explanation: text.includes('confidential')
                        ? 'Confidentiality obligations are properly defined.'
                        : 'No confidentiality clause found - sensitive information may not be protected.'
                    },
                    {
                      name: 'Termination Fairness',
                      present: text.includes('termination') || text.includes('terminate'),
                      status: (() => {
                        const termClause = clauses.find(c => c.title.toLowerCase().includes('termination'));
                        if (!termClause) return 'missing';
                        return termClause.risk === 'high' ? 'partial' : termClause.risk === 'medium' ? 'partial' : 'complete';
                      })(),
                      explanation: (() => {
                        const termClause = clauses.find(c => c.title.toLowerCase().includes('termination'));
                        if (!termClause) return 'Termination clause is missing - unclear how the contract can be ended.';
                        if (termClause.risk === 'high') return 'The termination clause may favor one party and should be reviewed.';
                        if (termClause.risk === 'medium') return 'Termination terms exist but could be more balanced.';
                        return 'Termination clause provides fair notice requirements for both parties.';
                      })()
                    },
                    {
                      name: 'Liability Balance',
                      present: text.includes('liability') || text.includes('indemnif'),
                      status: (() => {
                        const liabClause = clauses.find(c => c.title.toLowerCase().includes('liability') || c.title.toLowerCase().includes('indemnif'));
                        if (!liabClause) return 'missing';
                        return liabClause.risk === 'high' ? 'partial' : liabClause.risk === 'medium' ? 'partial' : 'complete';
                      })(),
                      explanation: (() => {
                        const liabClause = clauses.find(c => c.title.toLowerCase().includes('liability') || c.title.toLowerCase().includes('indemnif'));
                        if (!liabClause) return 'Liability terms are not defined - risk allocation is unclear.';
                        if (liabClause.risk === 'high') return 'Liability terms are heavily imbalanced and may expose you to excessive risk.';
                        if (liabClause.risk === 'medium') return 'Liability allocation exists but may favor one party.';
                        return 'Liability terms are reasonably balanced between parties.';
                      })()
                    },
                    {
                      name: 'Dispute Resolution',
                      present: text.includes('dispute') || text.includes('arbitration') || text.includes('mediation'),
                      status: text.includes('dispute') || text.includes('arbitration') ? 'complete' : 'missing',
                      explanation: text.includes('dispute') || text.includes('arbitration')
                        ? 'Dispute resolution mechanism is defined.'
                        : 'No dispute resolution clause - conflicts may lead to costly litigation.'
                    },
                    {
                      name: 'Force Majeure',
                      present: text.includes('force majeure') || text.includes('act of god'),
                      status: text.includes('force majeure') ? 'complete' : 'missing',
                      explanation: text.includes('force majeure')
                        ? 'Force majeure clause protects parties from unforeseeable events.'
                        : 'Missing force majeure clause - no protection for unforeseen circumstances.'
                    },
                    {
                      name: 'Governing Law',
                      present: text.includes('governing law') || text.includes('jurisdiction'),
                      status: text.includes('governing law') || text.includes('governed by') ? 'complete' : 'missing',
                      explanation: text.includes('governing law') || text.includes('governed by')
                        ? 'Governing law and jurisdiction are clearly specified.'
                        : 'Governing law is not specified - legal jurisdiction is unclear.'
                    },
                    {
                      name: 'Data Privacy',
                      present: text.includes('data') && (text.includes('privacy') || text.includes('protection') || text.includes('gdpr')),
                      status: text.includes('data') && text.includes('privacy') ? 'complete' : text.includes('data') ? 'partial' : 'missing',
                      explanation: text.includes('data') && text.includes('privacy')
                        ? 'Data privacy and protection terms are included.'
                        : text.includes('data')
                        ? 'Data is mentioned but privacy protections may be incomplete.'
                        : 'No data privacy clause - personal/sensitive data handling is not addressed.'
                    }
                  ];

                  return clauseChecks.map((check, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.65 + index * 0.05 }}
                      className={`p-4 rounded-lg border ${
                        check.status === 'complete'
                          ? 'bg-success/5 border-success/20'
                          : check.status === 'partial'
                          ? 'bg-warning/5 border-warning/20'
                          : 'bg-danger/5 border-danger/20'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-xl flex-shrink-0 mt-0.5">
                          {check.status === 'complete' ? '✅' : check.status === 'partial' ? '⚠️' : '❌'}
                        </span>
                        <div className="flex-1">
                          <h4 className={`font-semibold mb-1 ${
                            check.status === 'complete'
                              ? 'text-success'
                              : check.status === 'partial'
                              ? 'text-warning'
                              : 'text-danger'
                          }`}>
                            {check.name}
                          </h4>
                          <p className="text-sm text-dark-300">{check.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  ));
                })()}
              </div>
            </div>

            {/* Recommended Improvements (Missing Clauses) */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">💡 Recommended Improvements</h3>
              <p className="text-sm text-dark-400 mb-4">
                These optional clauses could strengthen your contract but are not required for basic compliance.
              </p>
              <div className="space-y-3">
                {(() => {
                  const text = finalContractText.toLowerCase();
                  const recommendedClauses = [];

                  if (!text.includes('dispute') && !text.includes('arbitration')) {
                    recommendedClauses.push({
                      name: 'Dispute Resolution',
                      reason: 'Would define how conflicts are resolved (arbitration vs litigation), potentially saving time and legal costs.',
                      benefit: 'Faster, cheaper conflict resolution'
                    });
                  }

                  if (!text.includes('force majeure')) {
                    recommendedClauses.push({
                      name: 'Force Majeure',
                      reason: 'Would protect both parties from liability during unforeseen events (natural disasters, pandemics, war).',
                      benefit: 'Protection from uncontrollable circumstances'
                    });
                  }

                  if (!text.includes('governing law') && !text.includes('jurisdiction')) {
                    recommendedClauses.push({
                      name: 'Governing Law',
                      reason: 'Would specify which state/country laws apply and where disputes must be filed.',
                      benefit: 'Legal clarity and predictability'
                    });
                  }

                  if (!text.includes('data') || !text.includes('privacy')) {
                    recommendedClauses.push({
                      name: 'Data Privacy',
                      reason: 'Would address GDPR/CCPA compliance and define how personal information is handled.',
                      benefit: 'Modern privacy compliance'
                    });
                  }

                  if (!text.includes('intellectual property') && !text.includes('ip rights') && !text.includes('ownership')) {
                    recommendedClauses.push({
                      name: 'Intellectual Property Rights',
                      reason: 'Would clarify ownership of work product, inventions, and creative materials.',
                      benefit: 'Prevents future IP disputes'
                    });
                  }

                  if (!text.includes('amendment') && !text.includes('modification')) {
                    recommendedClauses.push({
                      name: 'Amendment Procedure',
                      reason: 'Would establish how the contract can be modified with proper documentation.',
                      benefit: 'Controlled change management'
                    });
                  }

                  if (recommendedClauses.length === 0) {
                    return (
                      <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                        <p className="text-success flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5" />
                          <span>Excellent! All recommended clauses are present in this contract.</span>
                        </p>
                      </div>
                    );
                  }

                  return recommendedClauses.map((clause, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="p-4 bg-ibm-blue/5 border border-ibm-blue/20 rounded-lg hover:border-ibm-blue/40 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-ibm-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Lightbulb className="w-4 h-4 text-ibm-blue" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{clause.name}</h4>
                          <p className="text-sm text-dark-300 mb-2">{clause.reason}</p>
                          <div className="flex items-center space-x-2 text-xs">
                            <span className="text-ibm-blue">✨ Benefit:</span>
                            <span className="text-dark-400">{clause.benefit}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ));
                })()}
              </div>
            </div>

            {/* AI Compliance Verdict */}
            <div className="p-6 bg-gradient-to-r from-ibm-blue/10 to-purple-500/10 border border-ibm-blue/30 rounded-lg">
              <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-ibm-blue" />
                <span>AI Compliance Verdict</span>
              </h3>
              <p className="text-dark-200 leading-relaxed">
                {(() => {
                  const text = finalContractText.toLowerCase();
                  const clauses = analysis?.clauses || [];
                  const highRisk = clauses.filter(c => c.risk === 'high').length;
                  const mediumRisk = clauses.filter(c => c.risk === 'medium').length;
                  
                  const missingCount = [
                    !text.includes('dispute') && !text.includes('arbitration'),
                    !text.includes('force majeure'),
                    !text.includes('governing law'),
                    !text.includes('data') || !text.includes('privacy')
                  ].filter(Boolean).length;

                  if (highRisk === 0 && missingCount === 0) {
                    return "This agreement is fully compliant with standard legal requirements. All essential clauses are present and properly balanced. The contract demonstrates professional drafting with adequate protections for both parties.";
                  } else if (highRisk <= 1 && missingCount <= 2) {
                    return "This agreement is partially compliant. While core clauses exist, several important legal protections are missing and some terms may benefit one party disproportionately. Consider adding the recommended clauses and reviewing flagged terms before signing.";
                  } else if (highRisk <= 2 && missingCount <= 3) {
                    return "This agreement has moderate compliance concerns. Multiple high-risk clauses and missing protections create potential legal vulnerabilities. Significant revisions are recommended to bring this contract up to professional standards.";
                  } else {
                    return "This agreement has serious compliance deficiencies. Critical legal protections are missing, and existing terms are heavily imbalanced. This contract requires substantial rework or professional legal review before it should be considered for execution.";
                  }
                })()}
              </p>
            </div>
          </motion.div>

          {/* Ask Your Contract - AI Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center space-x-3 mb-2">
              <MessageCircle className="w-6 h-6 text-ibm-blue" />
              <h2 className="text-2xl font-bold">Ask Your Contract</h2>
            </div>
            <p className="text-dark-400 mb-6">
              Ask questions about your contract and get AI-powered explanations.
            </p>

            {/* Quick Question Buttons */}
            <div className="mb-6">
              <p className="text-sm text-dark-400 mb-3">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage(question)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-ibm-blue/50 rounded-lg text-sm text-dark-200 hover:text-white transition-all"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="bg-dark-900/50 rounded-xl border border-white/10 mb-4 h-96 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <Bot className="w-16 h-16 text-ibm-blue/30 mx-auto mb-4" />
                    <p className="text-dark-400">
                      No messages yet. Ask a question to get started!
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user'
                            ? 'bg-ibm-blue'
                            : 'bg-gradient-to-br from-ibm-blue to-ibm-blue-600'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-ibm-blue text-white'
                            : 'bg-white/5 border border-white/10 text-dark-200'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {message.text}
                          </p>
                          <p className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-white/60' : 'text-dark-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ibm-blue to-ibm-blue-600 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-ibm-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-ibm-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-ibm-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Chat Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question about your contract..."
                className="flex-1 bg-dark-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:border-ibm-blue transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage()}
                disabled={!chatInput.trim() || isTyping}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </motion.button>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <p className="text-xs text-dark-400">
                <span className="font-semibold text-warning">⚠️ Disclaimer:</span> AI responses are informational and should not replace professional legal advice.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Score Card Component
const ScoreCard = ({ title, score, icon: Icon, color, highlight, isRisk }) => {
  const getScoreColor = (score, isRisk) => {
    if (isRisk) {
      // For risk scores: higher = worse (red)
      if (score >= 60) return 'text-danger';
      if (score >= 40) return 'text-warning';
      return 'text-success';
    } else {
      // For safety scores: higher = better (green)
      if (score >= 70) return 'text-success';
      if (score >= 45) return 'text-warning';
      return 'text-danger';
    }
  };

  const getBarColor = (score, isRisk) => {
    if (isRisk) {
      if (score >= 60) return 'bg-danger';
      if (score >= 40) return 'bg-warning';
      return 'bg-success';
    } else {
      if (score >= 70) return 'bg-success';
      if (score >= 45) return 'bg-warning';
      return 'bg-danger';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`glass rounded-xl p-6 ${highlight ? 'ring-2 ring-ibm-blue' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-6 h-6 ${color}`} />
        <span className={`text-3xl font-bold ${getScoreColor(score, isRisk)}`}>
          {score}%
        </span>
      </div>
      <h3 className="text-sm font-semibold text-dark-300 mb-3">{title}</h3>
      <div className="w-full bg-dark-800 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-2 rounded-full ${getBarColor(score, isRisk)}`}
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;

// Made with Bob
