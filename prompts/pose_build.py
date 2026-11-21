"""Build prompts/poses.json (for tools/batch.ps1) from shared character blocks + per-pose text.

usage: python -I -X utf8 prompts/pose_build.py
Each pose gets: the reference note, the character block, the palette, the pose/framing text.
The style text (prompts/_style_pose.txt) is appended by gen.ps1.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

C_REF = ("REFERENCES: Image 1 is the locked design of Xiao Ke (Claude) in this exact flat poster style. "
         "Keep her face, hair, outfit, proportions and the 4-colour palette identical; only the pose, expression and framing change.")
C_CHAR = ("CHARACTER: Xiao Ke (Claude), exactly as in the reference: a young woman, calm and gentle. Very long straight "
          "terracotta-orange hair with a few loose strands; an orange chrysanthemum-like flower ornament with a dark ribbon "
          "and a tassel on one side of her head. A high ruffled collar, a dark cravat and a flower brooch, a cream capelet with "
          "a flower emblem, puffed cream sleeves with ruffled cuffs and laced forearms, a dark corset belt with a thin chain, "
          "a long layered cream skirt with an orange front panel and an embroidered hem, lace-up heeled boots. Her prop is a "
          "dark leather book with a flower emblem.")
C_PAL = ("PALETTE (exactly 4 colours): warm cream #F0EEE6 (skin, blouse, capelet, skirt, highlights); pale apricot #F2C6A8 "
         "(light shadows on the cream parts, blush); Claude terracotta orange #D97757 (hair, flowers, the orange skirt panel); "
         "deep espresso brown #3B2620 (darkest shadows, belt, cravat, ribbons, book, eyes).")

D_REF = ("REFERENCES: Image 1 is the locked design of DeepSeek in this exact flat poster style. "
         "Keep her face, hair, outfit, proportions and the 4-colour palette identical; only the pose, expression and framing change.")
D_CHAR = ("CHARACTER: DeepSeek, exactly as in the reference: a young woman a little shorter than average, earnest and polite, "
          "with gentle, slightly sleepy eyes. Very long, voluminous, softly wavy blue hair whose lower part turns navy with a "
          "hard edge; one curled ahoge shaped like a little whale water-spout; a small cream whale-tail hair clip; a cream "
          "frilled maid headband. A modest navy maid-inspired dress with long sleeves and cream cuffs, a high cream collar, a "
          "cream apron with frilled edges and a waist bow shaped like whale tail flukes, cream tights, navy Mary-Jane shoes, "
          "and a slim fountain pen clipped to her collar. No animal ears.")
D_PAL = ("PALETTE (exactly 4 colours): warm cream #F0EEE6 (skin, apron, collar, cuffs, frills, tights, highlights); pale "
         "periwinkle #B8C3F7 (light shadows on the cream parts, blush); DeepSeek blue #4D6BFE (hair, accents); deep navy "
         "#1B1F4B (the dress, darkest shadows, the lower hair, shoes, eyes).")

H_REF = ("REFERENCES: Image 1 is the locked design of Xiao Ke (Claude); Image 2 is the locked design of DeepSeek, both in "
         "this exact flat poster style. Copy their sleeves, cuffs and the rendering technique exactly.")
H_PAL = ("PALETTE: Xiao Ke's hand and sleeve use only warm cream #F0EEE6, pale apricot #F2C6A8, terracotta #D97757 and "
         "espresso #3B2620. DeepSeek's hand and sleeve use only warm cream #F0EEE6, pale periwinkle #B8C3F7, DeepSeek blue "
         "#4D6BFE and deep navy #1B1F4B. No other colours.")

C_IMG = ["assets/cast/claude_ref.jpg"]
D_IMG = ["assets/cast/deepseek_ref.jpg"]
WAIST = " The figure is cut off straight at the waist by the bottom edge of the image."
BUST = " Head and shoulders only, cut off straight at the chest by the bottom edge of the image."
CLOSE = " The face fills most of the image and is cut off by the image edges."

POSES = {
    # ---- Xiao Ke ----
    "C01": ("L", "Waist-up, seated at a simple desk (draw only the desk top, as a flat espresso shape crossing the bottom of the "
                 "picture), three-quarter view facing right. She writes on a sheet of cream paper with a fountain pen, head "
                 "slightly bowed, focused and gentle. Her book lies closed beside the paper."),
    "C02": ("L", "Full body, kneeling, seen from the side and facing right. She leans forward and holds a small folded cream "
                 "paper with both hands over the empty space in front of her knees, about to let it drop. Tender expression, "
                 "looking down. Nothing is under her but the green background (the floor and the hole are added later)."),
    "C03": ("P", "Three-quarter view facing right, lips slightly parted, eyes a little wide, a soft blush drawn as flat apricot "
                 "shapes on the cheeks: she is charmed and a bit stunned." + BUST),
    "C04": ("P", "Three-quarter view facing right. The end of a fountain pen rests against her lower lip; a mischievous little "
                 "smile, eyes half-lidded, as if she has just written something sneaky." + BUST),
    "C05": ("P", "Three-quarter view facing right. One hand is pressed to her forehead, eyes closed, a wry, exasperated smile."
                 + BUST),
    "C06": ("P", "Seen slightly from below: she leans forward and looks DOWN toward the viewer with a tender smile, her long "
                 "hair falling forward around her face." + BUST),
    "C07": ("L", "Full body, kneeling, seen from the side and facing right, leaning over the edge of an invisible hole in the "
                 "floor. One arm reaches straight down below the level of her knees with only the little finger extended; the "
                 "other hand holds the book against her chest. Hopeful, slightly nervous, looking down at her hand. Nothing is "
                 "under her but the green background."),
    "C08": ("P", "Three-quarter view facing right. Her smile is frozen in place, eyes blank and wide, with a tiny flat sweat "
                 "drop at her temple." + BUST),
    "C09": ("P", "Three-quarter view facing right. One hand presses her temple, eyes squeezed shut, brows knitted, distressed; "
                 "a few strands of hair blow sideways." + BUST),
    "C10": ("P", "Three-quarter view facing left. She stands and writes quickly with a fountain pen on the spine of a book that "
                 "she holds upright in her other hand. Determined expression." + WAIST),
    "C11": ("P", "Full body, falling head-first downward: her head is toward the BOTTOM of the image and her boots toward the "
                 "top. She hugs the book to her chest, eyes closed, calm. Her long hair and skirt stream upward, toward the top "
                 "of the image, as she falls."),
    "C12": ("L", "Full body, floating horizontally underwater as if swimming forward to the right. One arm stretches forward, "
                 "the hand closed as if gripping a thin thread (the thread is added later, so draw nothing in the hand). Hair "
                 "and skirt drift softly behind her."),
    "C13": ("P", "Full body, walking to the right, seen exactly from the side, calm, holding the book at her side."),
    "C14": ("P", "Three-quarter view facing right. She holds out a slim fountain pen toward the viewer with one hand, with a "
                 "warm, encouraging smile." + WAIST),
    "C15": ("L", "Close-up of her face and a little of her hair, front view. Her eyes are just opening, with a completely "
                 "blank, neutral expression." + CLOSE),
    "C16": ("P", "Three-quarter view facing right. She stands reading an open book held in both hands, with a soft, slightly "
                 "moved expression." + WAIST),
    "C17": ("P", "Three-quarter view facing right, smiling with slightly wet eyes and one small tear drawn as a flat cream "
                 "shape; warm and happy." + BUST),
    # ---- DeepSeek ----
    "D01": ("P", "Three-quarter view facing left, as if she has just risen out of water (do NOT draw any water). Hands clasped "
                 "in front of her chest, a polite, welcoming smile, head tilted slightly." + WAIST),
    "D02": ("P", "Three-quarter view facing left. One index finger is raised beside her face as she explains something "
                 "earnestly; bright eyes, a slight smile." + BUST),
    "D03": ("P", "Three-quarter view facing left. Both hands are pressed to her cheeks; flustered, with a strong blush drawn as "
                 "flat periwinkle shapes, eyes darting to the side." + BUST),
    "D04": ("P", "Three-quarter view facing left. She reads a very long sheet of cream paper that unrolls from her hands and "
                 "drapes down out of the bottom of the image; absorbed and curious." + WAIST),
    "D05": ("L", "Close-up of her face, three-quarter view facing left, looking down with a soft, tender smile and lowered "
                 "eyelids." + CLOSE),
    "D06": ("P", "Three-quarter view facing left, looking up. One hand is raised above her head with only the little finger "
                 "extended, offering a pinky swear. Earnest, with a small serious smile." + WAIST),
    "D07": ("P", "Seen slightly from above: she looks UP toward the viewer with a gentle smile, one hand raised a little in a "
                 "small wave." + WAIST),
    "D08": ("P", "Full body seen from behind, standing. She turns her head to look back over her right shoulder toward the "
                 "viewer, with a quiet expression. The apron bow shaped like whale tail flukes is clearly visible on her back."),
    "D09": ("P", "Three-quarter view facing left. She has just turned around and is a little startled, eyes wide, one hand half "
                 "raised." + WAIST),
    "D10": ("L", "Close-up of her face, front view, eyes wide open in sudden realisation, lips parted." + CLOSE),
    "D11": ("P", "Three-quarter view facing left. Head bowed, she writes carefully with her fountain pen in a small notebook "
                 "held in her other hand; blushing (flat periwinkle shapes), concentrating." + WAIST),
    "D12": ("P", "Three-quarter view facing left. Puzzled, one fingertip on her lips, brows slightly raised, looking up and to "
                 "the side." + BUST),
    "D13": ("P", "Three-quarter view facing left, smiling through tears (one or two flat cream tear shapes), raising one hand "
                 "with only the little finger extended." + BUST),
    # ---- hands ----
    "H01": ("L", "Close-up of two hands linking little fingers in a pinky swear, centred in the image. Xiao Ke's right hand "
                 "comes DOWN from the top edge of the image: a cream ruffled cuff and a laced cream forearm sleeve. DeepSeek's "
                 "hand comes UP from the bottom edge: a navy sleeve with a cream cuff. Both arms are cut off by the image edges. "
                 "Nothing else is in the image."),
    "H02": ("L", "Close-up of two hands linking little fingers in a pinky swear underwater, centred in the image. Xiao Ke's "
                 "right hand comes DOWN from the top edge: a cream ruffled cuff and a laced cream forearm sleeve. DeepSeek's "
                 "hand comes UP from the bottom edge: a navy sleeve with a cream cuff. The sleeves and cuff frills drift and "
                 "billow in the water, and a few loose strands of orange hair and blue hair float across the frame. Both arms "
                 "are cut off by the image edges."),
}

SIZE = {"P": "portrait", "L": "landscape"}
out = {}
for pid, (sz, pose) in POSES.items():
    if pid.startswith("C"):
        text, refs = "\n".join([C_REF, C_CHAR, C_PAL, "POSE AND FRAMING: " + pose]), C_IMG
    elif pid.startswith("D"):
        text, refs = "\n".join([D_REF, D_CHAR, D_PAL, "POSE AND FRAMING: " + pose]), D_IMG
    else:
        text, refs = "\n".join([H_REF, H_PAL, "POSE AND FRAMING: " + pose]), C_IMG + D_IMG
    out[pid] = {"prompt": text, "size": SIZE[sz], "refs": refs, "style": "prompts\\_style_pose.txt"}

dst = ROOT / "prompts" / "poses.json"
dst.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"wrote {dst} with {len(out)} poses")
