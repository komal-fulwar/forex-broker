/* Slide data — Nail Clubbing Presentation
   All content is original, paraphrased academic wording.
   No textbook lines copied verbatim. */

export const slides = [
  // ── 1. TITLE ──
  {
    type: 'title',
    title: 'Digital Clubbing',
    subtitle: '',
    author: 'Presented by: Anushka Bhandare',

    notes: 'Welcome everyone. Today I will present on Nail Clubbing — covering its definition, pathophysiological mechanisms, types and causes, grading, clinical assessment methods, and the Schamroth window test in detail.',
  },

  // ── 2. INTRODUCTION & DEFINITION ──
  {
    type: 'content',
    heading: 'Introduction & Definition',
    notes: 'Digital clubbing is a clinical sign characterised by bulbous swelling of the soft tissue of the terminal phalanx. Key diagnostic features include loss of the Lovibond angle, increased nail curvature, and nail bed sponginess.',
    content: (
      <>
        <div className="definition-card">
          <strong>Definition:</strong> Digital clubbing is a clinical sign characterised by bulbous, uniform swelling of the soft tissue of the terminal phalanx of a digit, with subsequent loss of the normal angle between the nail and the nail bed.
        </div>

        <div className="section-title" style={{ marginTop: 20 }}>Key Features</div>
        <ul className="bullets">
          <li>Increased nail curvature in both longitudinal and transverse axes</li>
          <li>Sponginess (fluctuation) of the nail bed on palpation</li>
          <li>Loss of the normal 160° Lovibond angle (angle becomes ≥ 180°)</li>
        </ul>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <img
            src="/images/clubbing_intro.png"
            alt="Clubbing: Common Symptoms — bulging fingertips, downward curved nails, soft nail beds"
            style={{ maxHeight: 200, borderRadius: 4, border: '1px solid var(--border)' }}
          />
          <p className="image-caption">Clubbing: Common Symptoms</p>
        </div>
      </>
    ),
  },

  // ── 3. PATHOPHYSIOLOGY & MECHANISM ──
  {
    type: 'content',
    heading: 'Pathophysiology & Mechanism',
    notes: 'The exact mechanism is not fully understood. The VEGF/hypoxia theory and the megakaryocyte/platelet bypass theory are the two most widely accepted explanations for the pathogenesis of digital clubbing.',
    content: (
      <>
        <p className="intro-text">The exact mechanism is not fully understood, but several theories have been proposed. The most widely accepted involves VEGF and megakaryocyte/platelet fragments.</p>

        <div className="card-grid card-grid--2">
          <div className="card">
            <div className="card-head">Vascular Endothelial Growth Factor (VEGF) / Hypoxia Theory</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Chronic hypoxia → ↑ <strong>Vascular Endothelial Growth Factor (VEGF)</strong> release from distal tissues</li>
                <li>VEGF promotes angiogenesis & vascular permeability</li>
                <li>Connective tissue hyperplasia in the nail bed</li>
                <li>Leads to soft-tissue swelling of the fingertip</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">Megakaryocyte / Platelet Theory</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Megakaryocyte fragments normally fragmented in lungs</li>
                <li>In lung/cardiac disease → fragments bypass the lungs</li>
                <li>Lodge in distal capillaries of the digits</li>
                <li>Release <strong>Platelet-Derived Growth Factor (PDGF)</strong> & <strong>VEGF</strong> → local tissue proliferation</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },

  // ── 4. TYPES & CAUSES ──
  {
    type: 'content',
    heading: 'Types & Causes of Clubbing',
    notes: 'Clubbing is classified into four types based on the distribution of affected digits. Unidigital clubbing involves a single finger and suggests local pathology. Unilateral clubbing involves one hand. Bilateral clubbing indicates systemic disease. Differential clubbing affects only the toes.',
    content: (
      <>
        <div className="card-grid card-grid--2">
          <div className="card">
            <div className="card-head">1. Unidigital Clubbing</div>
            <div className="card-body">
              <ul className="bullets">
                <li>Only <strong>one finger</strong> involved</li>
                <li>Suggests <strong>local pathology</strong></li>
              </ul>
              <div className="section-title" style={{ marginTop: 10 }}>Causes</div>
              <ul className="bullets">
                <li>Trauma</li>
                <li>Infection</li>

              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">2. Unilateral Clubbing</div>
            <div className="card-body">
              <ul className="bullets">
                <li><strong>One hand</strong> involved</li>
                <li>Usually due to <strong>vascular or neurological causes</strong></li>
              </ul>
              <div className="section-title" style={{ marginTop: 10 }}>Causes</div>
              <ul className="bullets">
                <li>Arteriovenous fistula (AV fistula)</li>
                <li>Nerve injury</li>

              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">3. Bilateral (Generalised) Clubbing</div>
            <div className="card-body">
              <ul className="bullets">
                <li><strong>Both hands</strong> involved</li>
                <li>Indicates <strong>systemic disease</strong></li>
              </ul>
              <div className="section-title" style={{ marginTop: 10 }}>Common Causes</div>
              <ul className="bullets">
                <li><strong>Lung diseases:</strong> Lung cancer, Bronchiectasis, Lung abscess</li>
                <li><strong>Heart diseases:</strong> Cyanotic congenital heart disease</li>

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
                <li><strong>Patent Ductus Arteriosus (PDA)</strong> </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    ),
  },

  // ── 5. GRADES OF CLUBBING (images only) ──
  {
    type: 'content',
    heading: 'Grades of Clubbing',
    notes: 'Clubbing progresses through four recognised grades. Grade 1: fluctuation and softening. Grade 2: loss of Lovibond angle. Grade 3: increased curvature in all planes. Grade 4: drumstick appearance, often associated with hypertrophic osteoarthropathy.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16 }}>
        <img
          src="/images/clubbing_grades.png"
          alt="Grades I through IV of nail clubbing progression"
          style={{ maxHeight: 480, borderRadius: 6, border: '1px solid var(--border)' }}
        />
        <p className="image-caption" style={{ fontSize: 12, maxWidth: 600, textAlign: 'center', lineHeight: 1.5 }}>
          Progression from Grade 1 (fluctuation & softening) → Grade 2 (loss of Lovibond angle) → Grade 3 (increased curvature) → Grade 4 (drumstick appearance with HOA)
        </p>
      </div>
    ),
  },

  // ── 6. CLINICAL ASSESSMENT & TESTS ──
  {
    type: 'content',
    heading: 'Clinical Assessment & Tests',
    notes: 'Two primary clinical assessment methods are routinely employed. The Schamroth window test is the most widely used bedside screening tool. The Lovibond angle provides an objective angular measurement.',
    content: (
      <>
        <div className="card-grid card-grid--2">
          <div className="test-card">
            <h4>1. Schamroth Window Test</h4>
            <p>Place dorsal surfaces of opposite terminal phalanges together. Normally a diamond-shaped window is visible. In clubbing, this window is obliterated.</p>

          </div>

          <div className="test-card">
            <h4>2. Lovibond Angle / Profile Sign</h4>
            <p>The angle between the nail plate and the proximal nail fold (hyponychial angle) is measured. Normal: &lt; 180° (approximately 160°). Clubbing: ≥ 180°.</p>

          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <img
            src="/images/schamroth_test.png"
            alt="Schamroth Window Test — Normal (negative) vs. Positive (clubbing present)"
            style={{ maxHeight: 220, borderRadius: 4, border: '1px solid var(--border)' }}
          />
          <p className="image-caption">Schamroth Window Test — Normal (negative) vs. Positive (clubbing present)</p>
        </div>
      </>
    ),
  },

  // ── 7. SCHAMROTH WINDOW TEST — DETAIL ──
  {
    type: 'content',
    heading: 'Schamroth Window Test — Detail',
    notes: 'The Schamroth window test was developed by Leo Schamroth in 1976. It is a quick, non-invasive bedside test with high sensitivity and specificity for detecting digital clubbing.',
    content: (
      <>
        <div className="card-grid card-grid--2">
          <div className="card">
            <div className="card-head">✓ Normal Finding</div>
            <div className="card-body">
              <ul className="bullets">
                <li>The test was developed by <strong>Leo Schamroth in 1976</strong> after he noticed the disappearance of this window during his own episode of infective endocarditis.</li>
                <li>When opposing terminal phalanges of the same finger are placed together (nail-to-nail), a small diamond-shaped 'window' of light is visible at the nail base.</li>
                <li>This window exists because the Lovibond angle is &lt; 180°, creating a gap between the two nail-fold junctions.</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-head">✗ Positive (Clubbing)</div>
            <div className="card-body">
              <ul className="bullets">
                <li>When opposing phalanges are placed together, the normal diamond-shaped window is <strong>ABSENT</strong> (obliterated).</li>
                <li>This occurs because: the Lovibond angle ≥ 180° → the nail-fold areas are flush against each other → no gap remains.</li>
                <li><strong>Interpretation:</strong> Window present → No clubbing (negative). Window absent → Clubbing present (positive).</li>

              </ul>
            </div>
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



  // ── 9. REFERENCES ──
  {
    type: 'content',
    heading: 'References',
    notes: 'These are standard medical and cardiopulmonary textbook references and seminal journal articles. All content has been paraphrased from established academic sources.',
    content: (
      <>
        <div className="ref-title">Textbooks</div>
        <ol className="ref-list">
          <li>1. Hillegass, E. (2022). <em>Essentials of Cardiopulmonary Physical Therapy.</em> 5th ed. Elsevier.</li>
          <li>2. Watchie, J. (2010). <em>Cardiovascular and Pulmonary Physical Therapy: Evidence to Practice.</em> 2nd ed. Saunders/Elsevier.</li>
          <li>3. Pryor, J. A., &amp; Prasad, A. S. (2008). <em>Physiotherapy for Respiratory and Cardiac Problems.</em> 4th ed. Churchill Livingstone.</li>
          <li>4. Frownfelter, D., &amp; Dean, E. (2012). <em>Cardiovascular and Pulmonary Physical Therapy: Evidence and Practice.</em> 5th ed. Mosby/Elsevier.</li>
        </ol>

        <div className="ref-title">Journals</div>
        <ol className="ref-list secondary">
          <li>5. Schamroth, L. (1976). Personal experience. <em>South African Medical Journal</em>, 50(9), 297–300.</li>
          <li>6. Spicknall, K. E., &amp; Zirwas, M. J. (2009). Clubbing: an update on diagnosis, differential diagnosis, pathophysiology, and clinical relevance. <em>Journal of the American Academy of Dermatology</em>, 60(6), 1073–1082.</li>
          <li>7. Dickinson, C. J. (1993). The aetiology of clubbing and hypertrophic osteoarthropathy. <em>European Journal of Clinical Investigation</em>, 23(6), 330–338.</li>
          <li>8. Lovibond, J. L. (1938). Diagnosis of clubbed fingers. <em>The Lancet</em>, 231(5979), 363–364.</li>
          <li>9. Callemeyn, J., Van Haecke, P., Peetermans, W. E., &amp; Blockmans, D. (2016). Clubbing and hypertrophic osteoarthropathy. <em>Clinical Rheumatology</em>, 35, 2575–2581.</li>
        </ol>

        <p style={{ marginTop: 18, fontSize: 11.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>
          All content in this presentation has been paraphrased from established academic sources. No text has been copied verbatim.
        </p>
      </>
    ),
  },

  // ── 9. THANK YOU ──
  {
    type: 'thankyou',
    notes: 'Thank you for your attention. I am happy to take any questions or engage in discussion.',
  },
]
