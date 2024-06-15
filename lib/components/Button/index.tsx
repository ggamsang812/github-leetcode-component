import styles from "./styles.module.css";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...restProps } = props;
  return (
    <>
      <div>
        <button className={`${className} ${styles.button}`} {...restProps} />
      </div>
      <div>
        asdfasdf
      </div>
    </>
  );
}
