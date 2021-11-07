namespace hidden

-- In order for this to be the axiom of infinity, we would need to put instead
-- axiom myNat : Set
-- and make it work by rewriting the below axioms
axiom myNat : Type

axiom zero : myNat

axiom succ : myNat -> myNat

axiom zero_not_succ : ∀ (n : myNat), succ n ≠ zero 

axiom succ_injective : ∀ (n m : myNat), succ n = succ m → n = m

axiom induction : ∀ (p : myNat → Prop), p zero ∧ (∀ (n: myNat), p n → p (succ n)) → (∀ (n : myNat), p n)  

-- Proposition 2.1.4. Three is a natural number
-- How do we avoid marking this as noncomputable??
noncomputable def three : myNat := succ (succ (succ zero))


noncomputable def four : myNat := succ(three)

--Proposition 2.1.6.
theorem four_neq_zero : four ≠ zero := 
  begin
    unfold four,
    exact zero_not_succ three,
  end
end hidden 

-- To define addition we would need the recursion theorem, and for that we need some set theory already


-- We'll be using pure set theory, i.e. everything is a Set.
-- Set theory in the book takes in addition the type of Objects, but the only way to identify sets with objects is via some unnatural coercion
-- Idea: make a type Object, but it's just syntactic sugar for Set. It would make all the statements more intuitive imo
constant Set : Type
constant is_an_element_of : Set → Set → Prop 

axiom set_extensionality (A B : Set) : A = B ↔ (∀ (a b : Set), is_an_element_of a A ↔ is_an_element_of b B) 

def is_empty (A : Set) : Prop := ∀ (x : Set), ¬ is_an_element_of x A

axiom empty_set : ∃ (emp : Set), is_empty emp

axiom singleton (a : Set) : ∃ (X : Set), ∀ (x : Set), is_an_element_of x X ↔ x = a

axiom pair_set (a b : Set) : ∃ (X : Set), ∀ (x : Set), is_an_element_of x X ↔ x = a ∨ x = b

axiom pairwise_union (A B : Set) : ∃ (X : Set), ∀ (x : Set), is_an_element_of x X ↔ is_an_element_of x A ∨ is_an_element_of x B

-- For specification and replacement, I think it would be more natural to have (P : A → Prop) for example, but I can't make it work that way

axiom specification (A : Set) (P : Set → Prop) : ∃ (X : Set), ∀ (x : Set), is_an_element_of x X ↔ is_an_element_of x A ∧ P x

axiom replacement (A : Set) (P : Set → Set → Prop) : (∀ (x : Set), is_an_element_of x A → (∀ (y y' : Set), P x y → y = y')) → ∃ (X : Set), ∀ (z : Set), is_an_element_of z X ↔ (∃ (x : Set), is_an_element_of x A ∧ P x z)


lemma unique_empty_set : ∀ (A B : Set), is_empty A ∧ is_empty B → A = B :=
  begin
    intros A B hAB,
    rw set_extensionality,
    intros a b,
    have h₁ : is_an_element_of a A → is_an_element_of b B,
    {
      intros a_in_A,
      exfalso,
      exact hAB.1 a a_in_A,
    },
    have h₂ : is_an_element_of b B → is_an_element_of a A,
    {
      intros b_in_B,
      exfalso,
      exact hAB.2 b b_in_B,
    },
    exact ⟨h₁,h₂⟩,
  end

/-
 Thoughts: 
  - I think it's imperative we borrow some notation, like ∈, from the standard library. I'm not sure how to do that without creating conflicts. Similarly I want to be able to write ∀ x ∈ A, instead of the long-winded versions above.
  - We need to import some tactics from mathlib, otherwise we're just making it too hard on ourselves.
  - On that note, we could 'not import' some things from the standard library, like the type set, or even the type ℕ. I think it would be difficult to not import ℕ since it is needed for defining the type hierarchy, but maybe we can get rid of other things. 
  - I'm having trouble definining things like the empty set and intersections. I know there exists a unique empty set, so how do I say "let ∅ be the unique empty set given by such such theorem"?
-/

