/* Slide data — Nail Clubbing Presentation
   All content is original, paraphrased academic wording.
   No textbook lines copied verbatim. */

export const slides = [
  // ── 1. TITLE ──
  {
    type: 'title',
    title: 'Nail Clubbing',
    subtitle: 'Definition  •  Mechanism  •  Types & Causes  •  Grades  •  Clinical Tests  •  Cardiopulmonary Correlation',
    author: 'Presented by: [Your Name]',
    meta: 'PG Student, Physiotherapy  •  [College Name]  •  [Date]',
    notes: 'Welcome everyone. Today I will present on Nail Clubbing — covering its definition, pathophysiological mechanisms, classification, grading, clinical assessment methods, and its significance in cardiopulmonary evaluation.',
  },



  // ── 3. DEFINITION ──
  {
    type: 'content',
    heading: 'Definition of Nail Clubbing',
    notes: 'Digital clubbing is defined by obliteration of the Lovibond angle, which normally measures approximately 160 degrees. When this angle exceeds 180 degrees, clubbing is clinically evident. The phalangeal depth ratio exceeding 1.0 is the most objective diagnostic criterion.',
    content: (
      <>
        <div className="definition-card">
          Digital clubbing is a physical examination finding characterised by selective bulbous enlargement of the distal segment of a digit, owing to proliferation of connective tissue between the nail matrix and the distal phalanx.
        </div>

        <div className="card-grid card-grid--2" style={{ marginTop: 20 }}>
          <div>
            <div className="section-title">Morphological Changes</div>
            <ul className="bullets">
              <li><strong>Nail bed:</strong> Increased vascularity and oedematous interstitial tissue renders the nail bed fluctuant (spongy) on palpation</li>
              <li><strong>Distal phalanx:</strong> Fusiform soft-tissue hypertrophy produces the characteristic bulbous enlargement</li>
              <li><strong>Nail curvature:</strong> Increased convexity in both longitudinal and transverse axes (watch-glass deformity)</li>
            </ul>
          </div>
          <div>
            <div className="section-title">Diagnostic Criteria</div>
            <ul className="bullets">
              <li><strong>Lovibond angle:</strong> Normal ≈ 160° → obliterated to ≥ 180° in clubbing</li>
              <li><strong>Phalangeal depth ratio:</strong> DPD ÷ IPD ratio exceeds 1.0 (normal &lt; 1.0) — most objective measure</li>
              <li><strong>Schamroth sign:</strong> Loss of the diamond-shaped window when opposing nails dorsum-to-dorsum</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },

  // ── 4. PATHOPHYSIOLOGY ──
  {
    type: 'content',
    heading: 'Pathophysiology & Mechanism',
    notes: 'Two principal theories explain clubbing. The VEGF-hypoxia theory proposes chronic hypoxia stimulates Vascular Endothelial Growth Factor release. The megakaryocyte-platelet bypass theory suggests that megakaryocyte fragments bypass the pulmonary capillary bed in right-to-left shunts, lodging in digital vasculature and releasing PDGF and VEGF.',
    content: (
      <>
        <p className="intro-text">The precise pathogenesis remains under investigation. Two principal mechanistic theories are recognised in current literature:</p>

        <div className="card-grid card-grid--2">
          <div className="card">
            <div className="card-head">VEGF (Vascular Endothelial Growth Factor) / Hypoxia Theory</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Chronic tissue hypoxia upregulates <strong>Vascular Endothelial Growth Factor (VEGF)</strong></li>
                <li>VEGF promotes angiogenesis and increases vascular permeability in digital tissue</li>
                <li>Resultant connective tissue hyperplasia in the periungual region</li>
                <li>Soft-tissue oedema and vascular proliferation produce fingertip enlargement</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">Megakaryocyte / Platelet Bypass Theory</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Megakaryocytes normally fragment into platelets within the pulmonary capillary bed</li>
                <li>In right-to-left shunts or pulmonary AV malformations → fragments bypass the lungs</li>
                <li>Intact fragments lodge in distal digital capillaries</li>
                <li>Release <strong>Platelet-Derived Growth Factor (PDGF)</strong> and <strong>VEGF</strong> → local tissue proliferation</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },

  // ── 5. TYPES & CAUSES ──
  {
    type: 'content',
    heading: 'Types & Causes of Clubbing',
    notes: 'Clubbing is classified into four types based on the distribution of affected digits. Unidigital clubbing involves a single finger and suggests local pathology. Unilateral clubbing involves one hand and is usually due to vascular or neurological causes. Bilateral clubbing indicates systemic disease. Differential clubbing affects only the toes with normal upper limbs, classically seen in PDA with Eisenmenger syndrome.',
    content: (
      <>
        <div className="card-grid card-grid--2">
          <div className="card">
            <div className="card-head">1. Unidigital Clubbing</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Only <strong>one finger</strong> involved</li>
                <li>👉 Suggests <strong>local pathology</strong></li>
              </ul>
              <div className="section-title" style={{ marginTop: 10 }}>Causes</div>
              <ul className="bullets">
                <li>Trauma</li>
                <li>Infection</li>
                <li>Tumors (e.g., glomus tumor)</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">2. Unilateral Clubbing</div>
            <div className="card-body">
              <ul className="bullets">
                <li><strong>One hand</strong> involved</li>
                <li>👉 Usually due to <strong>vascular or neurological causes</strong></li>
              </ul>
              <div className="section-title" style={{ marginTop: 10 }}>Causes</div>
              <ul className="bullets">
                <li>Arteriovenous fistula (AV fistula)</li>
                <li>Nerve injury</li>
                <li>Hemiplegia</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">3. Bilateral (Generalised) Clubbing</div>
            <div className="card-body">
              <ul className="bullets">
                <li><strong>Both hands</strong> involved</li>
                <li>👉 Indicates <strong>systemic disease</strong></li>
              </ul>
              <div className="section-title" style={{ marginTop: 10 }}>Common Causes</div>
              <ul className="bullets">
                <li><strong>Lung diseases:</strong> Lung cancer, Bronchiectasis, Lung abscess</li>
                <li><strong>Heart diseases:</strong> Cyanotic congenital heart disease</li>
                <li><strong>GIT / Liver:</strong> Cirrhosis, Inflammatory bowel disease</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">4. Differential Clubbing</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Clubbing in <strong>lower limbs only</strong> (toes)</li>
                <li>Upper limbs remain <strong>normal</strong></li>
              </ul>
              <div className="section-title" style={{ marginTop: 10 }}>Classic Cause</div>
              <ul className="bullets">
                <li><strong>Patent Ductus Arteriosus (PDA)</strong> with Eisenmenger syndrome</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },

  // ── 6. KEY FEATURES ──
  {
    type: 'content',
    heading: 'Key Features of Nail Clubbing',
    notes: 'This slide illustrates the anatomical differences between a normal digit and a clubbed digit. Note the obliterated Lovibond angle, the enlarged nail bed with increased vascularity, and the increased curvature of the nail plate in the clubbed specimen.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16 }}>
        <img
          src="/images/nail_clubbing_diagram.png"
          alt="Normal nail vs Clubbed nail — anatomical cross-section showing Lovibond angle, nail bed, distal phalanx"
          style={{ maxHeight: 420, borderRadius: 6, border: '1px solid var(--border)' }}
        />
        <p className="image-caption" style={{ fontSize: 12, maxWidth: 500, textAlign: 'center', lineHeight: 1.5 }}>
          Cross-sectional comparison: Normal digit (Lovibond angle ~160°) versus clubbed digit (angle ≥ 180°) demonstrating nail bed enlargement and increased nail plate curvature.
        </p>
      </div>
    ),
  },

  // ── 7. GRADES / STAGES ──
  {
    type: 'content',
    heading: 'Grades / Stages of Clubbing',
    notes: 'Clubbing progresses through four recognised grades. Grade I is the earliest with nail bed fluctuation. Grade II shows obliteration of the Lovibond angle. Grade III demonstrates increased convexity in all planes. Grade IV represents the drumstick deformity and may include hypertrophic osteoarthropathy with periosteal new bone formation.',
    content: (
      <>
        <div className="grades-visual">
          <img src="/images/clubbing_grades.png" alt="Grades I through IV of nail clubbing progression" />
          <p className="image-caption">Progression from Grade I (earliest detectable) to Grade IV (drumstick appearance with HOA)</p>
        </div>

        <div className="card-grid card-grid--4">
          <div className="card">
            <div className="card-head">Grade I — Fluctuation</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Nail bed feels spongy (fluctuant) on palpation</li>
                <li>Loss of normal firm attachment to periosteum</li>
                <li>Lovibond angle preserved (~160°)</li>
                <li>Earliest clinically detectable sign</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">Grade II — Angle Loss</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Lovibond angle obliterated (≥ 180°)</li>
                <li>DPD/IPD ratio exceeds 1.0</li>
                <li>Nail appears to 'float' on the bed</li>
                <li>Schamroth window test becomes positive</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">Grade III — Curvature</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Accentuated convexity in all planes</li>
                <li>Parrot-beak / watch-glass deformity</li>
                <li>Bulbous enlargement of fingertip</li>
                <li>Longitudinal &amp; transverse curvature ↑</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">Grade IV — Drumstick / HOA</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Entire distal phalanx hypertrophied</li>
                <li>Classic 'drumstick' morphology</li>
                <li>May exhibit periostitis (wrist, ankle)</li>
                <li>Hypertrophic osteoarthropathy (HOA)</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },

  // ── 8. CLINICAL TESTS ──
  {
    type: 'content',
    heading: 'Clinical Tests for Nail Clubbing',
    notes: 'Two primary clinical assessment methods are routinely employed. The Schamroth window test is the most widely used bedside screening tool with high sensitivity and specificity. The Lovibond angle provides an objective angular measurement that can be quantified via digital photography.',
    content: (
      <>
        <div className="card-grid card-grid--2">
          <div className="test-card">
            <h4>1. Schamroth's Window Test</h4>
            <p>Oppose dorsal surfaces of corresponding terminal phalanges (nail-to-nail). In healthy individuals, a diamond-shaped window of light is visible between the nail bases; this window is obliterated in the presence of clubbing.</p>
            <span className="note">Quick bedside screening &nbsp;•&nbsp; Sensitivity ~93% &nbsp;•&nbsp; Specificity ~95%</span>
          </div>

          <div className="test-card">
            <h4>2. Lovibond / Profile Angle</h4>
            <p>Assess the angle between the nail plate and the proximal nail fold in lateral profile. Normal &lt; 180° (~160°). An angle ≥ 180° is diagnostic of clubbing.</p>
            <span className="note">Objective angular measurement &nbsp;•&nbsp; Quantifiable via digital photography</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <img
            src="/images/schamroth_test.png"
            alt="Schamroth Window Test — Normal vs Positive"
            style={{ maxHeight: 220, borderRadius: 4, border: '1px solid var(--border)' }}
          />
          <p className="image-caption">Schamroth Window Test — Normal (negative) vs. Positive (clubbing present)</p>
        </div>
      </>
    ),
  },

  // ── 9. CARDIOPULMONARY CORRELATION ──
  {
    type: 'content',
    heading: 'Cardiopulmonary Correlation',
    notes: 'Clubbing holds particular significance in cardiopulmonary assessment. Its presence during clinical examination warrants further investigation with chest radiography, computed tomography, echocardiography, and pulmonary function testing. Progressive clubbing may signify disease progression, while regression may correlate with treatment response.',
    content: (
      <>
        <div className="definition-card">
          Digital clubbing demonstrates a strong association with chronic cardiopulmonary disease. Its identification during clinical examination should prompt systematic investigation of the respiratory and cardiovascular systems.
        </div>

        <div className="card-grid card-grid--2">
          <div className="card">
            <div className="card-head">Respiratory Associations</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Bronchogenic carcinoma — most prevalent malignant cause</li>
                <li>Bronchiectasis — chronic suppurative airways disease</li>
                <li>Cystic fibrosis — genetic cause with progressive lung involvement</li>
                <li>Idiopathic pulmonary fibrosis — restrictive interstitial lung disease</li>
                <li>Lung abscess and empyema — chronic intrathoracic suppuration</li>
                <li>Mesothelioma — asbestos-related pleural malignancy</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">Cardiac Associations</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Cyanotic congenital heart disease — right-to-left intracardiac shunting</li>
                <li>Subacute bacterial endocarditis — chronic endovascular infection</li>
                <li>Atrial myxoma — primary intracardiac neoplasm</li>
                <li>Arteriovenous fistulae — aberrant vascular communications</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div className="section-title">Examination Relevance</div>
          <ul className="bullets">
            <li>Clubbing should be systematically assessed during hand inspection in every cardiorespiratory examination</li>
            <li>Presence warrants further workup — chest radiography, CT thorax, echocardiography, spirometry</li>
            <li>Progressive clubbing may indicate disease progression; regression may suggest treatment response</li>
            <li>Bilateral clubbing typically reflects systemic pathology; unilateral suggests local vascular cause</li>
          </ul>
        </div>
      </>
    ),
  },

  // ── 10. CLINICAL SIGNIFICANCE ──
  {
    type: 'content',
    heading: 'Clinical Significance',
    notes: 'Early identification of digital clubbing is clinically important because it may be the presenting sign of occult malignancy or serious cardiopulmonary disease. New-onset clubbing in an adult patient should raise a high index of suspicion for bronchogenic carcinoma or other thoracic pathology.',
    content: (
      <>
        <div className="card-grid card-grid--3">
          <div className="card">
            <div className="card-head">Early Recognition</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Clubbing may be the presenting sign of occult malignancy or systemic disease</li>
                <li>Can precede overt respiratory symptoms by weeks to months</li>
                <li>Requires no specialised equipment — a simple bedside assessment</li>
                <li>Early identification facilitates timely diagnostic evaluation</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">Diagnosis & Referral</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Positive findings warrant prompt medical referral</li>
                <li>Guides prioritisation of diagnostic investigations</li>
                <li>New-onset clubbing in adults should raise suspicion for thoracic malignancy</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">Assessment & Monitoring</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Should be incorporated into routine clinical examination</li>
                <li>Progressive clubbing may signal disease advancement</li>
                <li>Regression of clubbing may correlate with successful treatment</li>
                <li>Serial assessment valuable in patients with known cardiopulmonary disease</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="callout" style={{ marginTop: 20 }}>
          <strong>Key Takeaway:</strong> Any clinician who identifies new or progressive digital clubbing should consider it a clinical red flag warranting systematic evaluation to exclude significant underlying pathology.
        </div>
      </>
    ),
  },

  // ── 11. CONCLUSION ──
  {
    type: 'content',
    heading: 'Conclusion',
    notes: 'In summary, digital clubbing is a time-honoured clinical sign with substantial diagnostic significance. Systematic assessment should be part of every clinical evaluation. A high index of suspicion and timely referral can significantly impact patient outcomes.',
    content: (
      <div className="conclusion-wrapper">
        <div className="conclusion-inner">
          <div className="definition-card" style={{ textAlign: 'center', fontSize: 16, padding: 28 }}>
            Digital clubbing remains a <strong>clinically significant physical examination finding</strong> that serves as an important indicator of underlying cardiopulmonary, gastrointestinal, and systemic disease.
          </div>

          <ul className="bullets" style={{ marginTop: 28 }}>
            <li>The pathogenesis involves vascular connective tissue proliferation driven by <strong>Vascular Endothelial Growth Factor (VEGF)</strong> and <strong>Platelet-Derived Growth Factor (PDGF)</strong> via megakaryocyte-platelet bypass mechanisms</li>
            <li>Classified into four types: unidigital, unilateral, bilateral (generalised), and differential clubbing</li>
            <li>Bedside assessment using Schamroth's test and Lovibond angle measurement provides reliable clinical detection</li>
            <li>Grading from fluctuation (Grade I) to drumstick deformity with HOA (Grade IV) facilitates disease staging</li>
            <li>Early recognition enables timely diagnosis, appropriate referral, and improved patient outcomes</li>
            <li><strong>Systematic nail examination should be integrated into every routine clinical assessment</strong></li>
          </ul>
        </div>
      </div>
    ),
  },

  // ── 12. REFERENCES ──
  {
    type: 'content',
    heading: 'References',
    notes: 'These are standard medical and cardiopulmonary textbook references and seminal journal articles. All content has been paraphrased from established academic sources.',
    content: (
      <>
        <div className="ref-title">Textbooks — Cardiopulmonary & General Medicine</div>
        <ol className="ref-list">
          <li>1. Hillegass, E. (2022). <em>Essentials of Cardiopulmonary Physical Therapy.</em> 5th ed. Elsevier.</li>
          <li>2. Watchie, J. (2010). <em>Cardiovascular and Pulmonary Physical Therapy.</em> 2nd ed. Saunders.</li>
          <li>3. Pryor, J.A. &amp; Prasad, A.S. (2008). <em>Physiotherapy for Respiratory and Cardiac Problems.</em> 4th ed. Churchill Livingstone.</li>
          <li>4. Frownfelter, D. &amp; Dean, E. (2012). <em>Cardiovascular and Pulmonary Physical Therapy.</em> 5th ed. Mosby.</li>
          <li>5. West, J.B. (2021). <em>West's Respiratory Physiology: The Essentials.</em> 11th ed. Wolters Kluwer.</li>
          <li>6. Kumar, P. &amp; Clark, M. (2021). <em>Kumar &amp; Clark's Clinical Medicine.</em> 10th ed. Elsevier.</li>
        </ol>

        <div className="ref-title">Journal Articles & Seminal Papers</div>
        <ol className="ref-list secondary">
          <li>7. Schamroth, L. (1976). Personal experience. <em>S Afr Med J</em>, 50(9), 297–300.</li>
          <li>8. Spicknall, K.E. &amp; Zirwas, M.J. (2009). Clubbing: an update. <em>J Am Acad Dermatol</em>, 60(6), 1073–1082.</li>
          <li>9. Dickinson, C.J. (1993). The aetiology of clubbing and HOA. <em>Eur J Clin Invest</em>, 23(6), 330–338.</li>
          <li>10. Lovibond, J.L. (1938). Diagnosis of clubbed fingers. <em>The Lancet</em>, 231(5979), 363–364.</li>
          <li>11. Callemeyn, J. et al. (2016). Clubbing and HOA. <em>Clin Rheumatol</em>, 35, 2575–2581.</li>
        </ol>

        <p style={{ marginTop: 18, fontSize: 11.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
          All content in this presentation has been paraphrased from established academic sources. No text has been copied verbatim.
        </p>
      </>
    ),
  },

  // ── 13. THANK YOU ──
  {
    type: 'thankyou',
    notes: 'Thank you for your attention. I am happy to take any questions or engage in discussion.',
  },
]
